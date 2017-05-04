/* eslint-disable no-console */

// RabbitMQ library
import amqp from 'amqplib';

// Delay returns a promise that resolves after the number of
// milliseconds passed have elapsed.  This is useful for 'suspending'
// an awaited statement inside of an async function (in other words -
// to simulate a pause)
import delay from 'delay';

// Set-up a default RabbitMQ channel. In future, we may need
// multiple channels back to Rabbit, but right now
// this serves us well enough.  One channel can handle any number of
// 'queues'-- which are the categories of worker that determine
// who should listen to messages
let defaultChannel;

class Queue {
  constructor(ch, name) {
    this.ch = ch;
    this.name = name;
  }

  // Send a message to the RabbitMQ queue.  Currently this accepts
  // strings and converts them to bytes via `Buffer`.
  // All `send` messages persist to disk.
  // TODO:  Test if content is already binary to avoid conversion
  async send(data) {
    // Only accept objects
    const content = new Buffer(
      JSON.stringify(data),
      'utf8',
    );
    return this.ch.sendToQueue(this.name, content, {
      persistent: true,
    });
  }

  // Register `consume` handler.  This should always be an async
  // function, since `await` can then bind to a promise chain and
  // acknowledgements are only sent upon successful execution (i.e. no
  // errors/exceptions)
  receive(fn) {
    return this.ch.consume(this.name, async msg => {
      // Turn the content back into an object
      const data = JSON.parse(msg.content.toString());

      // Await the callback, and return parsed content + raw msg
      await fn(data, msg);

      // If we're here, it means the above async callback was a
      // success, and we should acknowledge that back to RabbitMQ
      return this.ch.ack(msg);
    }, {
      noAck: false,
    });
  }

}

// Abstraction for `send`ing and `receive`ing back to RabbitMQ.
// One `Channel` class per queue name
class Channel {
  constructor(ch) {
    this.ch = ch;
  }

  async getQueue(name = '') {
    let str = name;

    const res = await this.ch.assertQueue(name, {
      durable: true,
    });

    // If we have no name, we have a random string - keep it
    if (!str) {
      str = res.queue;
    }

    return new Queue(this.ch, str);
  }
}

// Attempt connection, and return channel.  If we have an existing connection,
// then simply send that back again -- we currently have no need for more
// than one connection per app
export default async function connect() {
  // Is there an existing queue?
  if (defaultChannel) {
    return defaultChannel;
  }

  // try to reconnect 10x
  for (let i = 1; i <= 10; i++) {
    try {
      const conn = await amqp.connect('amqp://rabbitmq');
      const ch = await conn.createChannel();
      defaultChannel = new Channel(ch);

      return defaultChannel;
    } catch (e) {
      console.log(`RabbitMQ Error: ${e.message}`);
      console.log(`RabbitMQ connection attempt #${i} failed, retrying...`);
      await delay(1000);
    }
  }

  throw new Error("Couldn't connect to RabbitMQ!");
}

/* global SERVER, API_URL */
import { observable, action } from 'mobx';
import url from 'url';
import cookie from 'js-cookie';
import qs from 'querystring';

// Stores
import ContextStore from 'stores/common/context';

export default class Request extends ContextStore {
  @observable token;

  constructor(init) {
    super(init);
    if (!SERVER) {
      this.token = cookie.get('token');
    }
  }

  @action setToken(token) {
    this.token = token;

    // If we're on the client, set as a cookie for web server requests
    if (!SERVER) {
      cookie.set('token', token, { expires: 30 });
    }
  }

  @action clearToken() {
    this.token = null;
    if (!SERVER) {
      cookie.remove('token');
    }
  }

  async send(opt) {
    const res = await fetch(url.resolve(API_URL, opt.uri), Object.assign(opt, {
      headers: Object.assign({}, opt.headers, {
        authorization: this.token ? `Bearer ${this.token}` : null,
      }),
    }));

    const body = await res.json();

    if (res.status !== 200) throw body;
    return body;
  }

  async get(path, data = null) {
    let uri = path;
    if (data) uri += `?${qs.stringify(data)}`;
    return this.send({ uri });
  }

  async post(uri, data) {
    return this.send({
      uri,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  }

  async upload(uri, data) {
    return this.send({
      uri,
      method: 'POST',
      body: data,
    });
  }

  async put(uri, data) {
    return this.send({
      uri,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  }

  async delete(uri) {
    return this.send({
      uri,
      method: 'DELETE',
    });
  }

  dehydrate() {
    return {
      token: this.token,
    };
  }
}

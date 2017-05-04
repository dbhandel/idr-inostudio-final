import React from 'react';

/* components */
import Answer from 'views/dashboard/practice/answer';

const question = 'What is <span class="bold">parseInt()</span> function?';
const response = 'quotient = dividend/divisor';
const answer = 'In mathematics, a rational number is any number that can be expressed as the quotient or fraction p/q of two integers, with the denominator q not equal to zero.';
const tags = ['css', 'javascript'];
const source = {
  link: 'flaticon.com',
  text: 'flaticon.com',
};
const documents = {
  title: 'ParseInt(string, radix)',
  content: <img src="http://art-oboi.by/assets/images/by_users/black-and-white/fotolia_47291031_subscription_monthly_xl.jpg" alt="preview documents" />,
//   content: <p>The parseInt function converts its first arguments to a string, parse it,
// and returns an integer or NaN, if not NaN,
// the returned value will be the decimal integer representation
// if the first argument taken as a number in the specified radix (base).</p>,
};
const views = 7;
const progress = {
  to: 4,
  from: 8,
};

const answerMock = (
  <Answer
    question={question}
    response={response}
    answer={answer}
    tags={tags}
    source={source}
    documents={documents}
    views={views}
    progress={progress} />
);

export default answerMock;

import validator from 'validator';
import moment from 'moment';
import sanitizeHtml from 'sanitize-html';
import cheerio from 'cheerio';
import css from 'css';

// CSS class names
const classes = [
  'fr-draggable',
  'fr-dii',
  'fr-dib',
  'fr-fil',
  'fr-fir',
  'fr-rounded',
  'fr-bordered',
];

// Inline CSS styles
const styles = [
  'font-size',
  'width',
  'height',
  'color',
];

// sanitizeHtml options
const htmlOptions = {
  allowedTags: [
    'strong',
    'img',
    'p',
    'span',
    'em',
    'u',
    'ul',
    'ol',
    'li',
    'a',
  ],
  allowedClasses: {
    img: classes,
  },
  allowedAttributes: {
    '*': ['style'],
    img: [
      'src',
      'alt',
    ],
    a: [
      'href',
      'target',
      'rel',
    ],
  },
  parser: {
    lowerCaseTags: true,
  },
};

const plainOptions = {
  allowedTags: [],
  allowedAttributes: [],
};

/**
 * Parse inline style="" tag in HTML string, and returned sanitised HTML
 * @param {string} html - Raw HTML string
 */
function sanitizeStyles(html) {
  try {
    const $ = cheerio.load(html);
    $('[style]').each((_, raw) => {
      const ele = $(raw);
      try {
        const ast = css.parse(`*{${ele.attr('style')}}`);
        const stringify = css.stringify({
          type: 'stylesheet',
          stylesheet: {
            rules: [
              {
                type: 'rule',
                selectors: ['*'],
                declarations: ast.stylesheet.rules[0].declarations.filter(
                  dec => styles.includes(dec.property),
                ),
              },
            ],
          },
        }, { compress: true });
        const style = stringify.replace(/^\*{(.+)}$/, '$1');
        ele.attr('style', style || null);
      } catch (e) {
        ele.removeAttr('style');
      }
    });
    return $.html();
  } catch (e) {
    throw new Error('Invalid HTML');
  }
}

export default {
  async id() {
    if (!this.get('id')) {
      throw new Error('Recall ID not given');
    }

    if (!validator.isUUID(this.get('id'), 4)) {
      throw new Error('Invalid recall ID');
    }
  },

  // Multiple IDs
  async ids() {
    if (!this.get('ids')) {
      throw new Error('Recall IDs not given');
    }

    // Must be an array
    if (!Array.isArray(this.get('ids'))) {
      throw new Error('Recall IDs must be passed as an array');
    }

    // Maximum of 10,000 ids
    if (this.get('ids').length > 10000) {
      throw new Error('Maximum of 10,000 recall IDs can be passed');
    }

    // Each must be a UUID
    for (const id of this.get('ids')) {
      if (!validator.isUUID(id, 4)) {
        throw new Error('At least one invalid recall ID');
      }
    }
  },

  // Recall question
  async questionHTML() {
    if (!this.get('questionHTML')) {
      throw new Error('Please enter a recall question/title');
    }

    // Sanitise the input
    // First pass -- sanitise CSS
    const html = sanitizeStyles(this.get('questionHTML'));

    // HTML
    this.set('sanitizedQuestionHTML', sanitizeHtml(html, htmlOptions));

    // Plain
    this.set('sanitizedQuestionPlain', sanitizeHtml(html, plainOptions));

    // HTML validation
    if (!validator.isLength(this.get('sanitizedQuestionHTML'), { min: 1, max: 50000 })) {
      throw new Error('Your recall question/title exceeds the maximum 50,000 character limit for styling');
    }

    // Plain validation
    if (!validator.isLength(this.get('sanitizedQuestionPlain'), { min: 1, max: 256 })) {
      throw new Error('Your recall question/title should be between 1-256 characters in length');
    }
  },

  // Recall answer
  async answerHTML() {
    if (!this.get('answerHTML')) {
      throw new Error('Please enter a recall answer');
    }

    // Sanitize the input
    // Sanitise the input
    // First pass -- sanitise CSS
    const html = sanitizeStyles(this.get('answerHTML'));

    // HTML
    this.set('sanitizedAnswerHTML', sanitizeHtml(html, htmlOptions));

    // Plain
    this.set('sanitizedAnswerPlain', sanitizeHtml(html, plainOptions));

    // HTML validation
    if (!validator.isLength(this.get('sanitizedAnswerHTML'), { min: 1, max: 100000 })) {
      throw new Error('Your recall answer exceeds the maximum 100,000 character limit for styling');
    }

    // Plain validation
    if (!validator.isLength(this.get('sanitizedAnswerPlain'), { min: 1, max: 50000 })) {
      throw new Error('Your recall question/title should be between 1-50,000 characters in length');
    }
  },

  async tags() {
    if (this.get('tags')) {
      // Should be an array of tags
      if (!Array.isArray(this.get('tags'))) {
        throw new Error('Tags should be sent as an array of tags');
      }

      // Each tag should be a maximum of 256 characters
      for (const tag of this.get('tags')) {
        if (!validator.isLength(tag, { min: 1, max: 255 })) {
          throw new Error('Max of 255 characters per tag');
        }
      }
    }
  },

  async deadlines() {
    if (this.get('deadlines')) {
      // Should be an array
      if (!Array.isArray(this.get('deadlines'))) {
        throw new Error('Deadlines should be sent as an array');
      }

      // Create an empty parsed version
      const dates = [];

      // Loop through array, and make sure we have the right data
      for (const deadline of this.get('deadlines')) {
        // Label
        if (!deadline.label) {
          throw new Error('Please enter a label for your deadline');
        }

        // Must be a string
        if (typeof deadline.label !== 'string') {
          throw new Error('Label must be sent as a string');
        }

        if (!validator.isLength(deadline.label, { min: 1, max: 64 })) {
          throw new Error('Deadline label should be a max of 64 characters');
        }

        // Date
        if (!deadline.date) {
          throw new Error('Please select a date for your deadline');
        }

        // Must be a string
        if (typeof deadline.date !== 'string') {
          throw new Error('Deadline must be sent as a string');
        }

        // Turn our number input into a `Moment` object
        const date = moment(deadline.date);

        // Should be parsable by Moment
        if (!date.isValid()) {
          throw new Error('Please select a valid deadline');
        }

        // Should not be a date in the past
        if (date.startOf('day').isBefore(moment().startOf('day'))) {
          throw new Error('Please select a deadline in the future');
        }

        // All good - push our parsed version
        dates.push({
          label: deadline.label,
          date,
        });
      }

      this.set('parsedDeadlines', dates);
    }
  },
};

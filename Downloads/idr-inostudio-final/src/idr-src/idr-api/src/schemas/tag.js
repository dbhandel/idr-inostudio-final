import validator from 'validator';

export default {
  // Tag text
  async tag() {
    if (!this.get('tag')) {
      throw new Error('Please enter a tag');
    }

    if (!validator.isLength(this.get('tag'), { min: 1, max: 255 })) {
      throw new Error('Your tag should be between 1-255 characters in length');
    }
  },

  async tags() {
    if (!this.get('tags')) {
      throw new Error('Please enter tags');
    }

    if (!Array.isArray(this.get('tags'))) {
      throw new Error('Tags should be sent as an array of tags');
    }

    // Each tag should be a maximum of 256 characters
    this.get('tags').forEach(tag => {
      if (!validator.isLength(tag, { min: 1, max: 255 })) {
        throw new Error('Max of 255 characters per tag');
      }
    });
  },
};

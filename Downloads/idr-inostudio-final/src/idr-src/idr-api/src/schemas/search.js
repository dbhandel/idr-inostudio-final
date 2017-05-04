import validator from 'validator';

export default {
  async tags() {
    if (this.get('tags')) {
      if (!Array.isArray(this.get('tags'))) {
        throw new Error('Tags should be sent as an array of tags');
      }

      for (const tag of this.get('tags')) {
        // Should be a string
        if (typeof tag !== 'string') {
          throw new Error('Tags must strings');
        }

        // Each tag should be a maximum of 256 characters
        if (!validator.isLength(tag, { min: 1, max: 255 })) {
          throw new Error('Max of 255 characters per tag');
        }
      }
      this.set('parsedTags', this.get('tags'));
    } else {
      this.set('parsedTags', [null]);
    }
  },

  async text() {
    if (this.get('text')) {
      if (typeof this.get('text') !== 'string') {
        throw new Error('Search text must be a string');
      }

      if (!validator.isLength(this.get('text'), { min: 1, max: 255 })) {
        throw new Error('Max of 255 characters for the search string');
      }
    }
    this.set('parsedText', this.get('text') || '');
  },
};

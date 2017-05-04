export function toDotKeys(obj, prefix = '') {
  return Object.entries(obj).reduce((acc, [key, val]) => {
    const prefixedKey = prefix ? `${prefix}.${key}` : key;
    if (val && !Array.isArray(val) && typeof val === 'object') {
      return Object.assign(acc, toDotKeys(val, prefixedKey));
    }
    return Object.assign(acc, { [prefixedKey]: val });
  }, {});
}

export function formData(data = {}) {
  const form = new FormData();
  for (const key of Object.keys(data)) {
    form.append(key, data[key]);
  }
  return form;
}

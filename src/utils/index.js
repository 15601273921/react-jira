export const isFalse = (value) => (value === 0 ? false : !value);
export const clearObject = (obj) => {
  const result = { ...obj };
  Object.keys(result).forEach((key) => {
    const value = result[key];
    if (isFalse(value)) {
      delete result[key];
    }
  });
  return result;
};

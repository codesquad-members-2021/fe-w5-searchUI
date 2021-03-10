export const delay = (data, ms) =>
  new Promise((resolve) => setTimeout(() => resolve(data), ms));

export const pipe = (...fns) => (arg) => fns.reduce((arg, fn) => fn(arg), arg);

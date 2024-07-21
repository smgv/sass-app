export const setItemInLocalStorage = (
  key: string,
  value: object | null | string
) => localStorage.setItem(key, JSON.stringify(value));

export const getItemInLocalStorage = (key: string) =>
  JSON.parse(localStorage.getItem(key)!);

export const removeItemInLocalStorage = (key: string) =>
  localStorage.removeItem(key);

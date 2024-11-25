export const fetchApi = (input: string | URL | globalThis.Request,
                         init?: RequestInit) => {
  return fetch(input, init);
}
export const SEARCH = 'SEARCH';

export const searchAction = (query) => ({
  type: SEARCH,
  payload: query,
});
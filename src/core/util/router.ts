export function searchQueryToProps({
  filters = '',
  page,
  itemsPerPage,
  keyword,
  sort,
}: Record<string, string | string[]>) {
  return {
    keyword,
    pagination: { page: +page || 1, itemsPerPage: +itemsPerPage || 10 },
    filters: JSON.parse(atob(filters as string) || '{}'),
    sort: +sort || 0,
  };
}

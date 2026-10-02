export function paginate<T>(
  items: T[],
  pageParam: string | undefined,
  pageSize: number,
): { items: T[]; safePage: number; totalPages: number } {
  const currentPage = Math.max(1, Number(pageParam) || 1);
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const safePage = Math.min(currentPage, totalPages);
  return {
    items: items.slice((safePage - 1) * pageSize, safePage * pageSize),
    safePage,
    totalPages,
  };
}

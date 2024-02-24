
export interface Filters {
  filterName: string,
  filterParam: string
}


export interface CPagination {
  filters: Filters[],
  limit: number,
  page: number,
}

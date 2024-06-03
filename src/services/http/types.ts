export interface Pagination<T> { //tipagem de paginação
    data: T[],
    meta: {
        current_page: number,
        from: number,
        last_page: number,
        per_page: number,
        to: number,
        total: number,
    }
}
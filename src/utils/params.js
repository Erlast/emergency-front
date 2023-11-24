const PER_PAGE_PARAM = 'perPage'
const SORT_PARAM = 'sort'
const FILTER_PARAM = 'filters'

const pageHeader = {
    pageCount: 'x-count',
    perPage: 'x-per-page',
    currentPage: 'x-page'
}

const perPageLimit = [15, 25, 40, 60]

export {
    pageHeader, perPageLimit,
    PER_PAGE_PARAM, SORT_PARAM, FILTER_PARAM
}

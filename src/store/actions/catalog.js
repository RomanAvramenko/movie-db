import { CATALOG_DATA } from '../types'

export const catalogResults = ({response, currentPage, totalPages}) => {
    return {
        type: CATALOG_DATA,
        response,
        currentPage,
        totalPages
    }
}
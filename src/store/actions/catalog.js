import { CATALOG_DATA } from '../types'

export const catalogResults = (response) => {
    return {
        type: CATALOG_DATA,
        payload: response
    }
}
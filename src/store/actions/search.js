import { SEARCH_RESULTS } from "../types"


export const searchResults = (result) => {
    return {
        type: SEARCH_RESULTS,
        payload: result
    }
}
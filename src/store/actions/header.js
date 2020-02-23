import { HEADER_DATA, HEADER_TRAILER } from "../types"

export const headerData = ({data}) => {
    return {
        type: HEADER_DATA,
        payload: data,
    }
}

export const headerTrailer = ({trailerRes}) => {
    return {
        type: HEADER_TRAILER,
        payload: trailerRes
    }
}

import { DETAILED_INFO } from "../types"

export const detailedResuls = ({response, trailer, credits }) => {
    return {
        type: DETAILED_INFO,
        response,
        trailer,
        credits
    }
}
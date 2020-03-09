export const required = value => {
    if (value) return undefined

    return "Field is Required!"
}

export const minLength = value => {
    if (value.length < 8) return "Min length is 8 symbols"
    return undefined
}
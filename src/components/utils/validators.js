export const required = value => {
  return value
    ? undefined
    : "Field is Required!"
}

export const minLength = value => {
  return value && value.length < 8
    ? `Must be 8 characters or more`
    : undefined
}

export const email = value => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return value && !re.test(String(value).toLowerCase())
    ? 'Invalid email address'
    : undefined
}
export const confirmPass = (values, allValues) => {
  if (allValues.password !== allValues.confirm) {
    return 'Password mismatched';
  }
}

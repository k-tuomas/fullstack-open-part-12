const info = (...params) => {
  if (process.env.NODE_ENV !== 'test or not?') {
    console.log(...params)
  }
}

const error = (...params) => {
  if (process.env.NODE_ENV !== 'test or not?') {
    console.error(...params)
  }
}


module.exports = {
  info, error
}
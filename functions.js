exports.random = (num) => {
  let result = Math.floor(Math.random() * (num)) + 1
  return result
}
exports.choice = (array) => {
  if (typeof array != "object") throw new TypeError("choice require array.")
  let array_length = array.length
  let decide = Math.floor(Math.random() * array_length)
  let result = array[decide]
  return result
}

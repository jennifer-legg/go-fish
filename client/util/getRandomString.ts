//https://www.geeksforgeeks.org/javascript/random-string-generator-using-javascript/

export default function getRandomString() {
  const length = 7
  const characters =
    'abcdefghijklmnopqrstuvwxyz123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let result = ''
  const charactersLength = characters.length
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

export default interface Response {
  status: 'ok' | 'failed'
  reason?: string
}

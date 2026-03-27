export default interface Response {
  status: 'ok' | 'failed'
  reason?: string
}

export type CallbackFunction = (response: Response) => void

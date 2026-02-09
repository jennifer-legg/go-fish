import request from 'superagent'
import { Deck } from '../../models/deck'

const rootURL = new URL(`/api/v1`, document.baseURI)

export async function getShuffledDeck(): Promise<Deck> {
  const response = await request.get(`${rootURL}/deck`)
  return response.body as Deck
}

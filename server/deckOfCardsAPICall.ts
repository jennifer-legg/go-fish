import request from 'superagent'
import { Deck } from '../models/deck'

export default async function getShuffledDeck() {
  const response = await request.get(
    `https://www.deckofcardsapi.com/api/deck/new/draw/?count=52`,
  )
  return response.body as Deck
}

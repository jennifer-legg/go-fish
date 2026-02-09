import { Router } from 'express'
import { Deck } from '../../models/deck'
import getShuffledDeck from '../deckOfCardsAPICall'

const router = Router()

//Draw a new shuffled deck of 52 cards from Deck of Cards API (https://deckofcardsapi.com/)
router.get('/', async (req, res) => {
  try {
    const newDeck = await getShuffledDeck()
    newDeck && newDeck.success
      ? res.status(200).json(newDeck as Deck)
      : res.status(500).json({ message: 'Something went wrong' })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Something went wrong' })
  }
})

export default router

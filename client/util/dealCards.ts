// Takes a deck of cards and the number of players (2, 3 or 4) and returns an array of hands
// of cards from the cards in the deck, and an array of cards (the 'pond') which
// is the remaining cards not distributed to the player's hands.
import { Card } from '../../models/deck'

export interface DealCardsResult {
  hands: Card[][]
  pond: Card[]
}

export default function dealCards(
  numPlayers: number,
  cards: Card[],
): DealCardsResult {
  //maxCards is the number of cards each player should have in their hand at start of game.
  //Dependant on num of players.
  const maxCards = numPlayers === 2 ? 7 : numPlayers === 3 ? 6 : 5

  //Add cards to the hands of the players, up to max card number
  const hands: Card[][] = Array(numPlayers)
    .fill([])
    .map((_, index) =>
      cards.filter(
        (_, i) => (i + index) % numPlayers === 0 && i < numPlayers * maxCards,
      ),
    )

  //The last cards in the cardArray (not dealt to players) become the pond
  const pond = cards.slice(-(cards.length - numPlayers * maxCards))
  return { hands, pond }
}

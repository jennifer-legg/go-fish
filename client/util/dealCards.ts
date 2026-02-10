//TODO -- player id to be more customised?
// Takes a deck of cards and the number of players (2, 3 or 4) and returns an array of player objects
// with a hand of cards from the cards in the deck, and an array of cards (the 'pond') which
// is the remaining cards not distributed to the player's hands.
// Currently assigns an random id to the players

import { Card, Deck } from '../../models/deck'
import Player from '../../models/player'

interface Result {
  players: Player[]
  pond: Card[]
}

export default function dealCards(numPlayers: number, deck: Deck): Result {
  //maxCards is the number of cards each player should have in their hand at start of game.
  //Dependant on num of players.
  const maxCards = numPlayers === 2 ? 7 : numPlayers === 3 ? 6 : 5

  //Create an array of player objects, arr same length of number of players
  const players: Player[] = Array.from(
    Array(numPlayers).fill({}),
    (_, index) => {
      return { id: index + 1, hand: [], sets: 0 }
    },
  )

  //Add cards to the hands of the players, up to max card number
  players.forEach(
    (player, index) =>
      (player.hand = deck.cards.filter(
        (_, i) => (i + index) % numPlayers === 0 && i < numPlayers * maxCards,
      )),
  )

  //The last cards in the cardArray (not dealt to players) become the pond
  const pond = deck.cards.slice(-(deck.cards.length - numPlayers * maxCards))
  return { players, pond }
}

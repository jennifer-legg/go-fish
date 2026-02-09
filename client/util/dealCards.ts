// Takes an array of cards and the number of players and returns an array of player objects
// and the remaining deck.
// Each player object will have a hand of cards, with the amount of maxCards.
// The remaining deck becomes the pond of cards.

import Player from '../../models/player'

interface Result {
  players: Player[]
  pond: number[]
}

export default function dealCards(
  numPlayers: number,
  cardArr: number[],
): Result {
  //maxCards is the number of cards each player should have in their hand at start of game. Dependant on num of players.
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
      (player.hand = cardArr.filter(
        (_, i) => (i + index) % numPlayers === 0 && i < numPlayers * maxCards,
      )),
  )

  //The last cards in the cardArray (not dealt to players) become the pond
  const pond = cardArr.slice(-(cardArr.length - numPlayers * maxCards))
  return { players, pond }
}

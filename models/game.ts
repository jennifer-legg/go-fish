import { Deck } from './deck'

export interface Game {
  gameId: string
  deck: Deck
}

export interface GameCollection {
  [key: GameId]: Game
}

type GameId = string

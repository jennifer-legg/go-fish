import { Deck } from './deck'
import Player from './player'

export interface Game {
  gameId: string
  players: Player[]
  deck: Deck
}

export interface GameCollection {
  [key: code]: Game
}

type code = string

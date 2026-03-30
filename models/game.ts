import { Card } from './deck'
import Player from './player'

export interface Game {
  gameId: string
  pond: Card[]
}

export interface GameWithPlayers extends Game {
  players: Player[]
}

export interface GameCollection {
  [key: GameId]: Game
}

type GameId = string

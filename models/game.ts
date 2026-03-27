import { Card } from './deck'

export interface Game {
  gameId: string
  pond: Card[]
}

export interface GameCollection {
  [key: GameId]: Game
}

type GameId = string

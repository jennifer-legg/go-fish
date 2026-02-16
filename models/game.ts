import { Card } from './deck'
import Player from './player'

export interface Game {
  pond: Card[]
  players: Player[]
}

export interface GameCollection {
  [key: string]: Game
}

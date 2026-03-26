import Player from './player'

export interface Game {
  code: string
  players: Player[]
}

export interface GameCollection {
  [key: code]: Game
}

type code = string

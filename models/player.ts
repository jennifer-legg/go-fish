import { Card } from './deck'

export default interface Player {
  id: string
  username: string
  hand: Card[]
  sets: number
  gameId: string
}

export interface PlayerCollection {
  [key: string]: Player
}

export interface RivalPlayer {
  username: string
  numCards: number
  sets: number
}

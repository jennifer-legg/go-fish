import { Card } from './deck'

export default interface Player {
  username: string
  hand: Card[]
  sets: number
  gameId: string
}

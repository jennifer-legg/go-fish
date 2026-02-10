import { Card } from './deck'

export default interface Player {
  id: number
  hand: Card[]
  sets: number
}

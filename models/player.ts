import { Card } from './deck'

export default interface Player {
  socketId: string
  username: string
  hand: Card[]
  sets: number
  gameId: string
  avatar: string
}

export interface PlayerCollection {
  [key: SocketId]: Player
}

export interface Score {
  username: string
  sets: number
}

type SocketId = string

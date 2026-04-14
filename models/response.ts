import { Game } from './game'
import Player from './player'

export default interface Response {
  status: 'ok' | 'failed'
  reason?: string
}

export interface Update extends Response {
  player?: Player
  game?: Game
  allPlayers?: Player[]
}

export type CallbackClientsideFn = (response: Response) => void

export type CallbackSocketUpdateFn = (updateToNotify: Update) => void

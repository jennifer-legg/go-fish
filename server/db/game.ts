import connection from './connection'
import { Game } from '../../models/game'
import { Card } from '../../models/deck'

const gameSelect = ['id as gameId', 'pond']

interface GameSelect {
  gameId: string
  pond: string
}

export async function getGameById(gameId: string): Promise<Game | undefined> {
  const response: GameSelect = await connection('game')
    .where({ id: gameId })
    .select(...gameSelect)
    .first()
  if (response) {
    try {
      const pond: Card[] = JSON.parse(response.pond)
      return {
        ...response,
        pond,
      } as Game
    } catch (err) {
      console.log(err instanceof Error ? err.message : 'error parsing json')
    }
  }
  return undefined
}

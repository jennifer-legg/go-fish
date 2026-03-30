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

export async function addGame({
  pond,
  gameId,
}: Game): Promise<Game | undefined> {
  const pondJson = JSON.stringify(pond)
  const response: GameSelect[] = await connection('game')
    .insert({ pond: pondJson, id: gameId })
    .returning([...gameSelect])
  if (response[0]) {
    try {
      const pond = JSON.parse(response[0].pond)
      return { ...response[0], pond } as Game
    } catch (err) {
      console.log(err instanceof Error ? err.message : 'error parsing json')
    }
  }
  return undefined
}

export async function editPondInGame({
  pond,
  gameId,
}: Game): Promise<Game | undefined> {
  const pondJson = JSON.stringify(pond)
  const response: GameSelect[] = await connection('game')
    .where({ id: gameId })
    .update({ pond: pondJson })
    .returning([...gameSelect])
  if (response[0]) {
    try {
      const pond = JSON.parse(response[0].pond)
      return { ...response[0], pond } as Game
    } catch (err) {
      console.log(err instanceof Error ? err.message : 'error parsing json')
    }
  }
  return undefined
}

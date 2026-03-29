import connection from './connection'
import Player from '../../models/player'

type PlayerSelect = {
  socketId: string
  username: string
  hand: string
  sets: number
  gameId: string
  avatar: string
}

const playerSelect = [
  'game_id as gameId',
  'username',
  'hand',
  'avatar',
  'sets',
  'socket_id as socketId',
]

//Returns true if username is valid
export async function verifyUsername(username: string) {
  const response = await connection('player')
    .where({ username: username })
    .select('id')
  return response.length < 1
}

export async function getPlayerByUsername(
  username: string,
): Promise<Player | undefined> {
  const response: PlayerSelect | undefined = await connection('player')
    .where({ username })
    .select(...playerSelect)
    .first()
  return convertJson(response)
}

export async function getAllPlayersInGame(gameId: string): Promise<Player[]> {
  const response: PlayerSelect[] = await connection('player')
    .where({ game_id: gameId })
    .select(...playerSelect)
  try {
    return response.map((player: PlayerSelect) => {
      return { ...player, hand: JSON.parse(player.hand) }
    }) as Player[]
  } catch (err) {
    console.log(err instanceof Error ? err.message : 'error parsing json')
  }
  return []
}

export async function addNewPlayer({
  username,
  socketId,
  hand,
  avatar,
  sets,
  gameId,
}: Player) {
  const response: PlayerSelect | undefined = await connection('player')
    .insert({
      username,
      socket_id: socketId,
      hand: JSON.stringify(hand),
      avatar,
      sets,
      game_id: gameId,
    })
    .returning([...playerSelect])
  return convertJson(response)
}

export async function editPlayer({
  username,
  socketId,
  hand,
  avatar,
  sets,
  gameId,
}: Player) {
  const response: PlayerSelect | undefined = await connection('saved_games')
    .where({ username })
    .update({
      hand: JSON.stringify(hand),
      avatar,
      sets,
      game_id: gameId,
      socket_id: socketId,
    })
    .returning([...playerSelect])
  return convertJson(response)
}

function convertJson(playerData: PlayerSelect | undefined): Player | undefined {
  if (playerData) {
    try {
      const hand = JSON.parse(playerData.hand)
      return {
        ...playerData,
        hand,
      } as Player
    } catch (err) {
      console.log(err instanceof Error ? err.message : 'error parsing json')
    }
  }
  return undefined
}

import connection from './connection'
import Player from '../../models/player'

type PlayerSelect = {
  socketId: string
  username: string
  hand: string
  sets: number
  gameId: string
  avatar: string
  isActive: boolean
}

const playerSelect = [
  'game_id as gameId',
  'username',
  'hand',
  'avatar',
  'sets',
  'socket_id as socketId',
  'active as isActive',
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

export async function changeActiveStatus(
  isActive: boolean,
  socketId: string,
): Promise<Player | undefined> {
  const response = await connection('player')
    .where({ socket_id: socketId })
    .update({ active: isActive })
    .returning([...playerSelect])
  return convertJson(response[0])
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
  isActive,
}: Player): Promise<Player | undefined> {
  const response: PlayerSelect[] = await connection('player')
    .insert({
      username,
      socket_id: socketId,
      hand: JSON.stringify(hand),
      avatar,
      sets,
      game_id: gameId,
      active: isActive,
    })
    .returning([...playerSelect])
  if (response[0]) {
    return convertJson(response[0])
  }
  return undefined
}

export async function editPlayer({
  username,
  socketId,
  hand,
  avatar,
  sets,
  gameId,
  isActive,
}: Player) {
  const response: PlayerSelect[] = await connection('player')
    .where({ username })
    .andWhere({ game_id: gameId })
    .update({
      hand: JSON.stringify(hand),
      avatar,
      sets,
      game_id: gameId,
      socket_id: socketId,
      active: isActive,
    })
    .returning([...playerSelect])
  if (response[0]) {
    return convertJson(response[0])
  }
  return undefined
}

function convertJson(playerData: PlayerSelect | undefined): Player | undefined {
  if (playerData) {
    try {
      const hand = JSON.parse(playerData.hand)
      const isActive = Boolean(playerData.isActive)
      return {
        ...playerData,
        hand,
        isActive,
      } as Player
    } catch (err) {
      console.log(err instanceof Error ? err.message : 'error parsing json')
    }
  }
  return undefined
}

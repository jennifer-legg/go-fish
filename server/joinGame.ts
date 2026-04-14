import Player from '../models/player'
import { Game } from '../models/game'
import { CallbackSocketUpdateFn } from '../models/response'
import * as dbPlayer from './db/player'
import * as dbGame from './db/game'
import dealCards from '../client/util/dealCards'

interface JoinGameArg {
  gameId: string
  currentPlayer: Player
  maxPlayers: number
  socketId: string
}

//Check if returning player or new player to join game
//1. Game should already be in database
//2. Game should have at least one player
//3. Player is joining for first time if username is not within the game and game hasn't reached max players
//4. Player is rejoining if their username is within the game and they're inactive
export const joinGame = async (
  { gameId, currentPlayer, maxPlayers, socketId }: JoinGameArg,
  callback: CallbackSocketUpdateFn,
) => {
  try {
    const allPlayers = await dbPlayer.getAllPlayersInGame(gameId)
    const game = await dbGame.getGameById(gameId)
    if (game && allPlayers.length != 0) {
      const usernamePlayerMatch: Player[] = allPlayers.filter(
        (player) => player.username === currentPlayer.username,
      )
      if (usernamePlayerMatch.length === 0 && allPlayers.length < maxPlayers) {
        await joinFirstTime(
          allPlayers,
          game,
          maxPlayers,
          currentPlayer,
          gameId,
          callback,
          socketId,
        )
      } else if (
        usernamePlayerMatch.length === 1 &&
        !usernamePlayerMatch[0].isActive
      ) {
        await rejoinGame(currentPlayer, callback, allPlayers, game, socketId)
      } else {
        //Unable to join game
        const reason =
          usernamePlayerMatch.length === 0 && allPlayers.length >= maxPlayers
            ? 'Game already has maximum players'
            : usernamePlayerMatch.length === 1 &&
                usernamePlayerMatch[0]?.isActive
              ? 'Username already in use'
              : 'Server error, unable to join game'
        callback({
          status: 'failed',
          reason,
        })
      }
    } else {
      callback({
        status: 'failed',
        reason: 'Game does not exist',
      })
    }
  } catch (err) {
    console.log(err instanceof Error ? err.message : 'Join game failed')
    callback({
      status: 'failed',
      reason: 'Server error',
    })
  }
}

const rejoinGame = async (
  currentPlayer: Player,
  callBack: CallbackSocketUpdateFn,
  allPlayers: Player[],
  game: Game,
  socketId: string,
) => {
  //Change player status to active
  const playerToEdit: Player = allPlayers.filter(
    (player) => player.username === currentPlayer.username,
  )[0]
  const updatedPlayer = await dbPlayer.editPlayer({
    ...playerToEdit,
    isActive: true,
    socketId,
  })
  if (updatedPlayer) {
    const updatedAllPlayers: Player[] = allPlayers.map((item) =>
      item.username === updatedPlayer.username ? updatedPlayer : item,
    )
    callBack({
      status: 'ok',
      player: updatedPlayer,
      game,
      allPlayers: updatedAllPlayers,
    })
  } else {
    callBack({ status: 'failed', reason: 'Unable to rejoin game' })
  }
}

const joinFirstTime = async (
  allPlayers: Player[],
  game: Game,
  maxPlayers: number,
  currentPlayer: Player,
  gameId: string,
  callBack: CallbackSocketUpdateFn,
  socketId: string,
) => {
  //If game will be at max players with addition of this joining player,
  //deal cards from game pond to each player and add remaining cards to game pond.
  //Otherwise, just add player to game
  if (allPlayers.length + 1 === maxPlayers) {
    //Deal cards from game pond
    const { hands, pond } = dealCards(maxPlayers, game.pond)
    //Add hands and players to database
    const updatedOpponent = await dbPlayer.editPlayer({
      ...allPlayers[0],
      hand: hands[1],
    })
    const updatedPlayer = await dbPlayer.addNewPlayer({
      ...currentPlayer,
      hand: hands[0],
      socketId,
      gameId,
      isActive: true,
    })
    //Update pond in database
    const updatedGame = await dbGame.editPondInGame({
      pond,
      gameId,
    })
    if (updatedPlayer && updatedOpponent && updatedGame) {
      //Join socket room and update client for all players with game/player details
      callBack({
        status: 'ok',
        player: updatedPlayer,
        game: updatedGame,
        allPlayers: [{ ...updatedPlayer }, { ...updatedOpponent }],
      })
    } else {
      callBack({
        status: 'failed',
        reason: 'Server error',
      })
    }
  } else {
    //Add currentplayer to database
    const updatedPlayer = await dbPlayer.addNewPlayer({
      ...currentPlayer,
      socketId,
    })
    //Notify all players that the game has been joined
    if (updatedPlayer) {
      callBack({
        status: 'ok',
        game,
        player: updatedPlayer,
        allPlayers: [...allPlayers, updatedPlayer],
      })
    } else {
      callBack({
        status: 'failed',
        reason: 'Server error',
      })
    }
  }
}

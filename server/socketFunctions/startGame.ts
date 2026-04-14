import { CallbackSocketUpdateFn } from '../../models/response'
import * as dbGame from '../db/game'
import * as dbPlayer from '../db/player'
import Player from '../../models/player'
import { Deck } from '../../models/deck'
import { Game } from '../../models/game'

interface StartGameArg {
  currentPlayer: Player
  deck: Deck
  socketId: string
}

export const startGame = async (
  { currentPlayer, deck, socketId }: StartGameArg,
  callBack: CallbackSocketUpdateFn,
) => {
  try {
    //Add game to database
    const newGame: Game | undefined = await dbGame.addNewGame(deck.cards)
    if (newGame) {
      //Add player to database
      const newPlayer: Player | undefined = await dbPlayer.addNewPlayer({
        ...currentPlayer,
        gameId: newGame.gameId,
        socketId,
        isActive: true,
      })
      if (newPlayer) {
        callBack({
          game: newGame,
          status: 'ok',
          player: newPlayer,
          allPlayers: [{ ...newPlayer }],
        })
      } else {
        //Notify the user that the game could not be joined
        callBack({
          status: 'failed',
          reason: 'Unable to start the game',
        })
      }
    } else {
      //Notify the user that the game could not be joined
      callBack({
        status: 'failed',
        reason: 'Unable to create game',
      })
    }
  } catch (err) {
    console.log(err instanceof Error ? err.message : 'start game failed')
    callBack({
      status: 'failed',
      reason: 'Server error',
    })
  }
}

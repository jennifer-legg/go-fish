// goFish(gameId, username) => player, deck
// Removes one card from the deck's pond and adds it to the players hand.
// Returns the updated player/deck if pond has cards, failed if pond has no cards left.
import * as dbGame from '../db/game'
import * as dbPlayer from '../db/player'
import Player from '../../models/player'
import { CallbackSocketUpdateFn } from '../../models/response'
import { Card } from '../../models/deck'

export const goFish = async (
  currentPlayer: Player,
  callback: CallbackSocketUpdateFn,
): Promise<void> => {
  try {
    const card: undefined | Card = await dbGame.getCardFromPond(
      currentPlayer.gameId,
    )
    if (card) {
      const player: Player | undefined = await dbPlayer.addCardToHand(
        currentPlayer.username,
        card,
        currentPlayer.gameId,
      )
      if (player) {
        callback({ status: 'ok', player })
      }
    } else {
      callback({ status: 'failed', reason: 'Empty' })
    }
  } catch (err) {
    console.log(
      err instanceof Error ? err.message : 'Error getting card from pond',
    )
    callback({ status: 'failed', reason: 'Error getting card from pond' })
  }
}

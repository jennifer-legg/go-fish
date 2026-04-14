import { CallbackSocketUpdateFn } from '../../models/response'
import * as dbPlayer from '../db/player'

export const disconnectPlayer = async (
  socketId: string,
  callBack: CallbackSocketUpdateFn,
) => {
  try {
    //Change player's status in database
    const disconnectedPlayer = await dbPlayer.changeActiveStatus(
      false,
      socketId,
    )
    //Notify remaining players that player has disconnected
    if (disconnectedPlayer) {
      callBack({ status: 'ok', player: disconnectedPlayer })
    } else {
      console.log('Unable to mark player as inactive')
    }
  } catch (err) {
    console.log(
      err instanceof Error ? err.message : 'Change status to inactive failed',
    )
  }
}

import { Server } from 'socket.io'
import Player, { PlayerCollection } from '../models/player'
import Response from '../models/response'
// import { GameCollection } from '../models/game'

//Initialise storage for connected players
const players: PlayerCollection = {}
// const gameStorage: GameCollection = {}

//Socket.io server commands
export default function setupSocketIO(io: Server): void {
  io.on('connection', (socket) => {
    console.log(`a user connected ${socket.id}`)

    //When a player starts a new game
    socket.on('startGame', ({ gameId, currentPlayer }, callBack) => {
      //1. GameId should not already be in use
      //2. Start new game
      const gameIdInUse =
        Object.values(players).filter((player) => player.gameId === gameId)
          .length >= 1
      if (!gameIdInUse) {
        //Add player to storage
        const updatedPlayer: Player = {
          ...currentPlayer,
          gameId,
          id: socket.id,
        }
        players[socket.id] = updatedPlayer
        console.log(players)

        //Join the specified game
        socket.join(gameId)

        //Notify other players in the game about the new player
        io.to(gameId).emit('playerJoinedGame', updatedPlayer)

        //Send updated player list to all users in the room
        const updatedPlayersInGame: Player[] = Object.values(players).filter(
          (player) => player.gameId === gameId,
        )
        io.to(gameId).emit('players', updatedPlayersInGame)

        //Notify the user that the game has been joined
        const response: Response = { status: 'ok' }
        callBack(response)
      } else {
        //Notify the user that the game could not be joined and disconnect
        const response: Response = {
          status: 'failed',
          reason: 'Invalid access code',
        }
        callBack(response)
        socket.disconnect()
      }
    })

    //When a player joins a game (a socket io room)
    socket.on('joinGame', ({ gameId, currentPlayer, maxPlayers }, callBack) => {
      //1. Username should not be in use
      //2. Game should have less than the specified number of players
      //3. GameId should already be in use
      console.log(players)
      const playersInGame = Object.values(players).filter(
        (player) => player.gameId === gameId,
      )
      const usernameTaken =
        playersInGame.filter(
          (player) => player.username === currentPlayer.username,
        ).length >= 1
      //Check if room has less than max players and if username is taken
      if (
        playersInGame.length < maxPlayers &&
        playersInGame.length >= 1 &&
        !usernameTaken
      ) {
        //Add player to storage
        const updatedPlayer: Player = {
          ...currentPlayer,
          gameId,
          id: socket.id,
        }
        players[socket.id] = updatedPlayer
        console.log(players[socket.id])

        //Join the specified game
        socket.join(gameId)

        //Notify other players in the game about the new player
        io.to(gameId).emit('playerJoinedGame', updatedPlayer)

        //Send updated player list to all users in the room
        const updatedPlayersInGame: Player[] = Object.values(players).filter(
          (player) => player.gameId === gameId,
        )
        io.to(gameId).emit('players', updatedPlayersInGame)

        //Notify the user that the game has been joined
        const response: Response = { status: 'ok' }
        callBack(response)
      } else {
        //Notify the user that the game could not be joined and disconnect
        const reason: string = usernameTaken
          ? 'Unable to join game, username already in use.'
          : playersInGame.length < 1
            ? 'Invalid access code'
            : playersInGame.length >= maxPlayers
              ? 'Unable to join game, max players reached'
              : 'Error joining game'
        const response: Response = { status: 'failed', reason }
        callBack(response)
        socket.disconnect()
      }
    })

    //When a player disconnects
    socket.on('disconnect', () => {
      console.log(`user ${socket.id} disconnected`)
      const player = players[socket.id]
      if (player) {
        //Send update about player having left to remaining players in game (socket room)
        socket.to(player.gameId).emit('playerLeftGame', player)
        //Remove player from storage
        delete players[socket.id]
        //Update players list for front-end
        const remainingPlayersInGame: Player[] = Object.values(players).filter(
          (p) => p.gameId === player.gameId,
        )
        io.to(player.gameId).emit('playerLeftGame', remainingPlayersInGame)
      }
    })
  })
}

import express from 'express'
import * as Path from 'node:path'
import { createServer } from 'node:http'
import { Server } from 'socket.io'
import cors from 'cors'
import setupSocketIO from './setupSocketIo.ts'

import deckRoutes from './routes/deck.ts'

//Express application
const app = express()
const server = createServer(app)

//Configure CORS
app.use(cors({ origin: 'http://localhost:5173', credentials: true }))

//Initialize socket.io with CORS
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    credentials: true,
  },
})

setupSocketIO(io)

app.use(express.json())

app.use('/api/v1/deck', deckRoutes)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(Path.resolve('public')))
  app.use('/assets', express.static(Path.resolve('./dist/assets')))
  app.get('*', (req, res) => {
    res.sendFile(Path.resolve('./dist/index.html'))
  })
}

export default server

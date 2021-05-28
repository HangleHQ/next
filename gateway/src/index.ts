import { Server } from 'ws';
import { config } from './config'
import mongoose from 'mongoose';
import {
    MessageHandler
} from './handler'

mongoose.connect(config.mongodburi, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

const wss = new Server({ port: config.port, maxPayload: config.WebSocketMaxPayload })

wss.on('connection', MessageHandler)


wss.on('listening', () => console.log('Gateway online'))
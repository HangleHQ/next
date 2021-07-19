import EventEmitter from 'events';
import { Server } from 'ws';
import { config } from './config'
import {
    MessageHandler
} from './handler'


class GatewayHost extends EventEmitter {
    ws: Server;
    constructor () {
        super();
        this.ws = new Server({ port: config.port, maxPayload: config.WebSocketMaxPayload })
        
        this.ws.on('connection', (ws) => MessageHandler(ws, this.ws, this))

        this.ws.on('listening', () => console.log('Gateway online'))

        this.on('swag',() => console.log('swag'))
    }
}


export { GatewayHost }
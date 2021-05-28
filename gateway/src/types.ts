import WebSocket from 'ws'

export interface HangleWebSocket extends WebSocket {
    ids?: number,
    user?: {
        id: string,
        username: string,
        displayName: string,
        servers: any[],
    }
}
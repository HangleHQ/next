import { HangleWebSocket } from './types'

import {
    user
} from './schema'
import { Server } from 'ws'

export function MessageHandler(ws: HangleWebSocket, wss: Server) {
    /**
     * general websocket manager
     */

    function wsend(d: any) { ws.send(JSON.stringify(d)) }

    function MessageBroadcast(msg: any) {
        wss.clients.forEach((client: HangleWebSocket) => {
            let servers = client.user?.servers

            // * here goes the part where we filter the sends to clients that are not in specific guilds

            client.send(JSON.stringify({ op: 0, t: 'MESSAGE_CREATE', d: msg }))
        })
    }

    wsend({ op: 10, d: { heartbeat_interval: 41250 } }) // * send HELLO op 

    function generateID() {
        let date = Date.now() - 1609459200 * 1000;
        let num: number = 0;


        ws.ids ? ws.ids++ : ws.ids = 0;
        num += date;
        num += ws.ids;
        return num;
    }

    ws.on('message', async function (data) {
        let msg = JSON.parse((data as string));

        switch (msg.op) {
            case 1: // heartbeat ack
                wsend({ op: 11 })
                break;
            case 2: // 2 -> Auth
                let token = msg.d?.authToken;

                if (!token || token.length < 10) {
                    wsend({ op: 9 }) // invalid session
                    ws.close()
                    return;
                }

                let conUser: any = await user.findOne({ accessToken: token });

                if (!conUser) {
                    wsend({ op: 9 }) // invalid session
                    ws.close()
                    return;
                }

                ws.user = conUser;

                wsend({
                    op: 0,
                    t: 'READY',
                    d: {
                        communities: conUser.servers,
                        user: conUser,
                        v: 1,
                    }
                })
                break;

            case 5:
                let id = generateID();

                let content: any[] = [];
                let msgd = msg.d.message.content;
                msgd.split(' ').forEach((module: string) => {

                    let type;

                    if (module.startsWith(':') && module.endsWith(':')) type = 'emoji';
                    else if (module.startsWith(`<@`) && module.endsWith('>')) type = 'mention';
                    else if (module.match(/(https?:\/\/[^\s]+)/g)) type = 'url'
                    else type = 'string'

                    content.push({
                        type,
                        value: module
                    })

                })

                let messageObject = {
                    created_at: new Date().toISOString(),
                    channel_id: msg.d.channel.id,
                    id,
                    processID: ws.ids,
                    content,
                    author: {
                        username: ws.user.username,
                        displayName: ws.user.displayName,
                        id: ws.user.id,
                    }
                }

                MessageBroadcast(messageObject)
                break;


        }

    })
}


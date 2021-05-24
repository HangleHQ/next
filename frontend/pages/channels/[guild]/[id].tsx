import { useRouter } from 'next/router';
import React from 'react';
import {
    Guild,
    Channel,
    IDS
} from '../../../types'
import { getGuild, getUser, getMessages } from '../../../utils/gateway'
import Head from 'next/head'

import Loading from '../../../components/loading'
import ChannelBar from '../../../components/ChannelBar'
import ServerBar from '../../../components/ServerBar'
import ChannelMap from '../../../components/ChannelMap'
import Messages from '../../../components/msg/Messages';
import ChatBox from '../../../components/ChatBox'

export default function channel({ gateway }) {

    /**
     * local vars
     */

    const router = useRouter();

    /**
     * useState ception
     */

    let [loading, setLoading] = React.useState<boolean>(true)
    let [validRouter, setValidRouter] = React.useState<boolean>(false)
    let [LoadingMessages, setLoadingMessages] = React.useState<boolean>(true)

    // guild / channel / user related
    let [guild, setGuild] = React.useState<Guild>({})
    let [channel, setChannel] = React.useState<Channel>({})
    let [user, setUser] = React.useState<any>({}) // for now use any cuz im lazy
    let [messages, setMessages] = React.useState([]);

    let [ids, setIds] = React.useState<IDS>({})

    /**
     * useEffects
     */

    React.useEffect(() => {  //router validation
        if (router.asPath !== router.route) {
            setValidRouter(true);


            let split = router.asPath.split('/')

            split.shift() // remove empty string char
            // -> [1] -> /channels/
            // -> [2] -> guild id
            // -> [3] -> channel id

            setIds({ guild: split[1], channel: split[2] })
        }
    }, [router])


    React.useEffect(() => { // everything `first fetch` related

        if (!ids.guild) return;

        getGuild(ids.guild, gateway).then(guild => {
            if (guild._error) console.log('INVALID SERVER');
            else {
                setGuild(guild);
                let c = guild.channels.find(x => x.id == ids.channel)

                setChannel(c)
                getUser(gateway).then(user => {
                    setUser(user)
                    getMessages(c.id, gateway).then(msgs => {
                        setLoading(false)
                        setMessages(msgs)
                        setLoadingMessages(false)


                        try {
                            let msgd = document.getElementById('messages');
                            if (!msgd) return;
                            msgd.scrollTop = msgd?.scrollHeight
                        } catch { }
                    })

                })

            }
        })

    }, [validRouter, ids])






    gateway.ws.onmessage = (evt => {
        let msg = JSON.parse(evt.data);

        switch (msg.op) {


            case 6:
                if (msg.d.channel_id !== ids.channel) return;

                setMessages(msgs => [...msgs, msg.d])
                break;

        }

    })


    function changeServer(id) {

        ids.guild = id;
        setLoadingMessages(true)

        getGuild(ids.guild, gateway).then(guild => {
            if (guild._error) console.log('INVALID SERVER');
            else {
                setGuild(guild);

                setChannel(guild.dfchn)
                getMessages(guild.dfchn, gateway).then(msgs => {
                    setLoading(false)
                    setMessages(msgs)
                    setLoadingMessages(false)

                    try {
                        let msgd = document.getElementById('messages');
                        if (!msgd) return;
                        msgd.scrollTop = msgd?.scrollHeight
                    } catch { }

                })

            }
        })

    }

    function changeChannel(id) {
        setLoadingMessages(true)
        id = String(id)
        setChannel(id);

        getMessages(id, gateway).then(msgs => {
            setLoading(false)
            setMessages(msgs)
            setLoadingMessages(false)


            let msgd = document.getElementById('messages');
            msgd.scrollTop = msgd.scrollHeight

        })
    }

    if (loading) return <Loading />





    return (
        <>

        <Head>

            <title>
                { guild.name } &bull; { channel.name } - Hangle
            </title>

                { /* Meta tags for dynamic embeds.. (discord doesnt have this xD) */ }

                <meta property="og:title" content="Hangle" />
                <meta property="og:type" content="website" />
                <meta property="og:url" content={`${window.CONFIG.BASE_URL}/channels/${guild.id}/${channel.id}`} />

                <meta property="og:description" content={`${guild.name} / ${channel.name} at hangle!\n\n add channel desc here later lol`} />

                <meta name="theme-color" content="#820933" />
        </Head>


            <ServerBar user={user} change={changeServer} />

            <ChannelBar channel={{ name: 'swag' }} guild={guild} />

            <ChannelMap guild={guild} channel={channel} change={changeChannel} />

            {
                LoadingMessages ?
                    <div id="loadingBars">
                        <span className="loadingInline">
                            <span className="loadingCircle" />
                            <span className="loadingBarSmall" />
                        </span>
                        <br/><br/>
                        <span className="loadingBarSmall" />
                        <br />
                        <span className="loadingBarImage" />
                    </div>
                    :
                    <Messages messages={messages} />
            }




            <ChatBox gateway={gateway} ids={ids} />

        </>
    );

}
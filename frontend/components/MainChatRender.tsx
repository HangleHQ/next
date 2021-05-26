import { useRouter } from 'next/router';
import React from 'react';
import {
    Guild,
    Channel,
    IDS
} from '../types'
import { getGuild, getUser, getMessages } from '../utils/gateway'

import Loading from './loading'
import ChannelBar from './ChannelBar'
import ServerBar from './ServerBar'
import ChannelMap from './ChannelMap'
import Messages from './msg/Messages';
import ChatBox from './ChatBox'

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


    let [isHome, setIsHome] = React.useState<boolean | null>(null)

    /**
     * useEffects
     */

    React.useEffect(() => {  //router validation
        if (router.route === '/channels/me') {
            setIsHome(true);
        }
        if (router.asPath !== router.route) {
            setValidRouter(true);


            let split = router.asPath.split('/')

            split.shift() // remove empty string char
            // -> [1] -> /channels/
            // -> [2] -> guild id
            // -> [3] -> channel id

            setIsHome(false)
            console.log(split)
            setIds({ guild: split[1], channel: split[2] })


        }
    }, [router])


    React.useEffect(() => { // everything `first fetch` related

        if (isHome) {

            setTimeout(() => {

                getUser(gateway).then(user => {
                    setUser(user);
                    setLoading(false);
                })

            }, 2000)

        } else {
            if (!ids.guild) return;

            getGuild(ids.guild, gateway).then(guild => {
                if (guild._error) console.log('INVALID SERVER');
                else {
                    setGuild(guild);
                    let c = guild.channels.find(x => x.id == ids.channel)

                    setChannel(c)
                    getUser(gateway).then(user => {
                        setUser(user)
                        if (!c) {
                            setIsHome(true);
                            URLBarUtils('me')
                            return
                        }
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

        }

    }, [validRouter, ids, isHome])






    gateway.ws.onmessage = (evt => {
        let msg = JSON.parse(evt.data);

        switch (msg.op) {


            case 6:
                if (msg.d.channel_id !== channel.id) return;

                setMessages(msgs => [...msgs, msg.d])
                break;

        }

    })

    function URLBarUtils(change) {
        window.history.replaceState({}, null, `http://localhost:3000/channels/${change}`)
    }


    function changeServer(id) {

        ids.guild = id;
        setLoadingMessages(true)



        getGuild(ids.guild, gateway).then(guild => {
            if (guild._error) console.log('INVALID SERVER');
            else {
                setGuild(guild);

                setChannel(guild.channels.find(x => x.id == guild.dfchn));
                getMessages(guild.dfchn, gateway).then(msgs => {
                    setIds({ guild: id, channel: guild.dfchn })
                    setLoading(false)
                    setMessages(msgs)
                    setLoadingMessages(false)

                    setIsHome(false)
                    URLBarUtils(`${guild.id}/${guild.dfchn}`)

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
        setChannel(guild.channels.find(x => x.id == id));
        setIds({ guild: ids.guild, channel: id })

        getMessages(id, gateway).then(msgs => {
            setLoading(false)
            setMessages(msgs)
            setLoadingMessages(false)
            URLBarUtils(`${guild.id}/${id}`)


            let msgd = document.getElementById('messages');
            msgd.scrollTop = msgd.scrollHeight

        })
    }


    if (loading) return <Loading />




    return (
        <>

            {
                document.addEventListener('keydown', evt => {
                    if(document.activeElement.tagName !== 'INPUT') document.getElementById('chatbox_input').focus()

                    return true;
                })
            }


            <ServerBar user={user} change={changeServer} home={() => { setIsHome(true); setChannel({ name: 'Home' }); setGuild({ name: 'Hangle' }) }} />

            <ChannelBar channel={{ name: LoadingMessages ? 'loading' : channel?.name || 'error-5044' }} guild={guild} />

            { isHome ? null : <ChannelMap guild={guild} channel={channel} change={changeChannel} />}

            {
                isHome ?
                    <>
                        <div id="homePageContent">
                            Hangle... idk bugged af
                             </div>
                    </>
                    : <>

                        {
                            LoadingMessages ?
                                <div id="loadingBars">
                                    <span className="loadingInline">
                                        <span className="loadingCircle" />
                                        <span className="loadingBarSmall" />
                                    </span>
                                    <br /><br />
                                    <span className="loadingBarSmall" />
                                    <br />
                                    <span className="loadingBarImage" />
                                </div>
                                :
                                <Messages messages={messages} />
                        }
                    </>
            }




            { isHome ? null : <ChatBox gateway={gateway} ids={channel} />}

        </>
    );

}
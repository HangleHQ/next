import { useRouter } from 'next/router';
import React from 'react';
import {
    Guild,
    Channel,
    IDS
} from '../../../types'
import { getGuild, getUser } from '../../../utils/gateway'


import Loading from '../../../components/loading'
import ChannelBar from '../../../components/ChannelBar'
import ServerBar from '../../../components/ServerBar'

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

    // guild / channel / user related
    let [guild, setGuild] = React.useState<Guild>({})
    let [channel, setChannel] = React.useState<Channel>({})
    let [user, setUser] = React.useState<any>({}) // for now use any cuz im lazy


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
                getUser(gateway).then(user => {
                    setUser(user)
                    setLoading(false)
                })
                
            }
        })

    }, [validRouter, ids])

    if (loading) return <Loading />





    return (
        <>


            <ServerBar user={user} />

            <ChannelBar channel={{ name: 'swag' }} guild={guild} />


        </>
    );

}
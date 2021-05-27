

export default function ChannelMap({ guild, channel, change }) {



    return (
        <div className="channelmap">
            {
                guild.channels.map(c => {

                    return (
                        <div className="channel" onClick={x => change(c.id)}>
                            # &nbsp;
                            {
                                c.name
                            }
                        </div>
                    )
                })
            }
        </div>
    )
}
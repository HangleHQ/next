

export default function ServerBar({ user, change, home }) {


    console.log(user)

    return (
        <div id="serverbar">
            <div id="atme">
                <div className="noGuildIcon" onClick={home}>
                    <div className="noGuildIconItemWrapper">
                        <span className="noGuildIconText"> Home </span>
                    </div>
                </div>
            </div>
            <hr />
            {
                user.servers.map(guild => {

                    if (guild.icon) return null;

                    if (!guild.icon) {

                        let simplifiedName = '';

                        guild.name.split(' ').forEach(x => simplifiedName += x.charAt(0))

                        return (
                            <div className="noGuildIcon" aria-label={guild.id} onClick={c => change((c.target as any).ariaLabel)}>
                                <div aria-label={guild.id} className="noGuildIconItemWrapper">
                                    <span aria-label={guild.id} className="noGuildIconText"> {simplifiedName} </span>
                                </div>
                            </div>
                        )
                    }
                })
            }
        </div>
    )
}
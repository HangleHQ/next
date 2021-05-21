

export default function ServerBar({ user, change }) {


    return (
        <div id="serverbar">
            {
                user.servers.map(guild => {

                    if (guild.icon) return null;

                    if (!guild.icon) {

                        let simplifiedName = '';

                        guild.name.split(' ').forEach(x => simplifiedName += x.charAt(0))

                        return (
                            <div className="noGuildIcon" aria-label={guild.id} onClick={c => change((c.target as any).ariaLabel)}>
                                <div aria-label={guild.id} className="noGuildIconItemWrapper">
                                    <span aria-label={guild.id} className="noGuildIconText"> { simplifiedName } </span>
                                </div>
                            </div>
                        )
                    }
                })
            }
        </div>
    )
}
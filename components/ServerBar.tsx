

export default function ServerBar({ user }) {


    console.log(user)

    return (
        <div id="serverbar">
            {
                user.servers.map(guild => {

                    return <div> { guild.name } </div>
                })
            }
        </div>
    )
}
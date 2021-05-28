

interface GuildMember {
    id?: string,
    username?: string,
    nickname?: string
}

interface Guild {
    id?: string,
    name?: string,
    members?: GuildMember[], // -> Array of filled with GuildMember
    channels?: any[],
    defaultchannel?: string,

}


interface Channel {
    id?: string,
    name?: string,
}

interface IDS {
    channel?: string,
    guild?: string,
}

interface User {
    id: string,
    displayName: string,
    accessToken: string,
    username: string,
    servers: Guild[],
}


export type { Guild, GuildMember, Channel, IDS, User }
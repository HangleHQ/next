

interface GuildMember {
    id?: string,
    username?: string,
    nickname?: string
}

interface Guild {
    id?: string,
    name?: string,
    members?: GuildMember[] // -> Array of filled with GuildMember
}


interface Channel {
    id?: string,
    name?: string,
}

interface IDS {
    channel?: string,
    guild?: string,
}


export type { Guild, GuildMember, Channel, IDS }
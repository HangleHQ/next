import { Schema, model } from 'mongoose'

export default model('communities', new Schema({
    name: String,
    id: String,
    members: Array,
    settings: Object,
    roles: Array,
    channels: Array,
    iconURL: String,
    AFK_Settings: Object,
    bans: Array,
    Emojis: Array,
    AuditLog: Array,
    CommunitySettings: Object,
    defaultChannel: String,
}))
import { Schema, model } from 'mongoose';


export default model('user', new Schema({
    _id: String, // _id & id are the same
    username: String,
    avatar: String,
    displayName: String,
    id: String,
    Token: String,
    additional: Object,
    isverified: Boolean,
    email: String,
    password: String,
    servers: Array,
    friends: Array,
    groupDMs: Array,
    avatarURL: String,
    connections: Array,
    blockedUsers: Array,
    isPremium: Boolean,
    customStatus: String,
    boostedServers: Array,
    userSettings: Array,
    phoneNumber: String,
    privacySettings: Array,
    badges: Array,
}))
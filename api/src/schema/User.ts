import { Schema, model } from 'mongoose';


export default model('user', new Schema({
    _id: String, // _id & id are the same
    id: String,
    displayName: String,
    username: String,
    created_at: String,
    avatar: String,
    accessToken: String,
}))
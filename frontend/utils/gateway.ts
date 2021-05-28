import axios from "axios"
import { Guild, User } from "../types"




async function getGuild(id: string) {
    return new Promise((res, rej) => {
        axios.get(`${window.CONFIG.API_URL}/communities/${id}`, { withCredentials: true })
        .then(({ data }) => { res(data as Guild) })
        .catch() // TODO: error catching
    })
}

async function getUser(wshost) {
    return new Promise((res, rej) => {
        axios.get(`${window.CONFIG.API_URL}/users/me`, { withCredentials: true })
        .then(({ data }) => { res(data as User) })
        .catch() // TODO: error catching
    })
}

async function getMessages(channelId: string) {
    return new Promise((res, rej) => {
        axios.get(`${window.CONFIG.API_URL}/rooms/${channelId}/messages`, { withCredentials: true })
        .then(({ data }) => { res(data as any) })
        .catch() // TODO: error catching
    })
}

export {
    getGuild,
    getUser,
    getMessages,
}
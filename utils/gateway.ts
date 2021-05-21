



async function getGuild(id: string, wshost) {
    return await wshost.runQuery('get_server', { server: { id } })
}

async function getUser(wshost) {
    return await wshost.runOp(8, {}, 'GET_USER')
}


export {
    getGuild,
    getUser,
}
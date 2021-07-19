module.exports = {
    future: {
        webpack5: true
    },
    async redirects() {
        return [
            {
                source: '/me',
                destination: '/channels/me',
                permanent: true,
            },
        ]
    },
}
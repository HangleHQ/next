module.exports = {
    async redirects() {
        return [
          {
            source: '/',
            destination: '/channels/me',
            permanent: true,
          },
        ]
      }
}
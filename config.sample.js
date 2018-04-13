module.exports = () => ({
  telegram: {
    token: '',
    channel: ''
  },
  newsapi: {
    apiKey: '',
    refresh: 10, // minutes
    query: {
      language: 'en',
      q: 'apple OR google OR amazon OR facebook',
      sources: 'bbc-news,cnn,the-wall-street-journal', // https://newsapi.org/sources
      sortBy: 'publishedAt'
    },
    filter: { // additional filter
      title: [
        'google', 'amazon', 'tesla', 'facebook', 'netflix',
        'intel', 'alibaba', 'nvdia', 'dropbox', 'spotify',
        'microsoft', 'apple', 'nasdaq', 'trump'
      ]
    }
  },
  aws: {
    region: 'ap-southeast-1',
    profile: 'default',
    role: ''
  }
})

const request = require('request-promise')
const { fromPromise } = require('rxjs/observable/fromPromise')

const constructor = (apiKey) => {
  const http = request.defaults({
    headers: {
      'Content-Type': 'application/json'
    },
    baseUrl: 'https://newsapi.org/v2',
    json: true
  })

  const api = {}

  // please refer to https://newsapi.org/ for full query params
  api.everything = (params) => {
    const qs = Object.assign({ apiKey }, params)
    return fromPromise(http.get('/everything', { qs }))
  }

  return api
}

module.exports = constructor

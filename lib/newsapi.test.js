const test = require('ava')
const sinon = require('sinon')
const request = require('request-promise')
const { map } = require('rxjs/operators')
const NewsAPI = require('./newsapi')

test('newsapi should return status ok', t => {
  const data = {
    articles: [{
      author: 'The Editorial Board',
      description: 'The Supreme Court may dive into a divisive and partisan thicket.',
      publishedAt: '2018-03-28T23:01:41Z',
      source: {},
      url: 'https://www.wsj.com/articles/the-political-judges-of-gerrymanders-1522278100',
      urlToImage: 'https://images.wsj.net/im-5455/social'
    }],
    status: 'ok',
    totalResults: 11384
  }

  sinon.stub(request, 'get').returns(Promise.resolve(data))

  const newsapi = NewsAPI('awesome api key')
  const source = newsapi
    .everything({ domains: 'wsj.com' })
    .pipe(map(res => {
      t.is(res.articles[0].description, data.articles[0].description)
      t.is(res.status, 'ok')
    }))

  return source
})

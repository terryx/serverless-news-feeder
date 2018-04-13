const moment = require('moment')
const { from } = require('rxjs/observable/from')
const { mergeMap, filter, mapTo } = require('rxjs/operators')
const NewsAPI = require('./lib/newsapi')
const Telegram = require('./lib/telegram')
const config = require(`./config.${process.env.STAGE}`)()

const feed = (event, context, callback = {}) => {
  const newsapi = NewsAPI(config.newsapi.apiKey)
  const telegram = Telegram(config.telegram.token)
  const query = Object.assign({
    from: moment().subtract({ minute: config.newsapi.refresh }).format()
  }, config.newsapi.query)

  return newsapi.everything(query)
    .pipe(mergeMap(res => from(res.articles)))
    .pipe(
      mergeMap(res =>
        from(config.newsapi.filter.title)
          .pipe(filter(filterTitle => res.title.toLowerCase().includes(filterTitle)))
          .pipe(mapTo(res))
      )
    )
    .pipe(mergeMap(feed => {
      const chatId = config.telegram.channel
      const content = `<a href="${feed.url}">${feed.title}</a>`
      const opts = { parse_mode: 'HTML' }

      return telegram.sendMessage(chatId, content, opts)
    }))
    .subscribe(console.log, console.log, () => callback(null))
}

module.exports = { feed }

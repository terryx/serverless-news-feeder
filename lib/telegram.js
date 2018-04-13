const Telegram = require('telegraf/telegram')
const { fromPromise } = require('rxjs/observable/fromPromise')

const constructor = (token) => {
  const api = {}
  const bot = new Telegram(token)

  api.sendMessage = (chatId, message, opts = {}) => {
    return fromPromise(bot.sendMessage(chatId, message, opts))
  }

  return api
}

module.exports = constructor

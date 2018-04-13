const test = require('ava')
const sinon = require('sinon')
const { of } = require('rxjs/observable/of')
const { map } = require('rxjs/operators')
const Telegram = require('./telegram')

test('simple sendMessage', t => {
  const telegram = Telegram('xxx')
  const data = 'ok'
  sinon.stub(telegram, 'sendMessage').returns(of(data))

  const source = telegram
    .sendMessage('chatId', 'Please tell me which news')
    .pipe(map(res => {
      t.is(data, 'ok')
    }))

  return source
})

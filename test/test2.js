const test = require('tape')
const peek = require('../')

const levelup = require('level-test')()

const db = levelup('test-level-peek2')

db.batch([
  { key: 'key!0000001', value: 'foo', type: 'put' },
  { key: 'key!0000002', value: 'bar', type: 'put' },
  { key: 'key!0000003', value: 'baz', type: 'put' },
  { key: '~~~', value: 'EOF', type: 'put' },
], function(err) {
  if (err) throw err

  test('last', function(t) {
    peek.last(db, { gte: 'key ', lte: 'key~' }, function(err, key, value) {
      t.ok(!err)

      t.equal(value, 'baz')

      t.end()
    })
  })

  test('first', function(t) {
    peek.first(db, { gte: 'key ', lte: 'key~' }, function(err, key, value) {
      t.ok(!err)

      t.equal(value, 'foo')

      t.end()
    })
  })
})

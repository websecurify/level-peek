const pl = require('pull-level')
const pull = require('pull-stream')

function first(cb) {
  let data

  const func = function(_data) {
    data = _data

    return false
  }

  if (cb) {
    return pull.drain(func, function(err) {
      cb(err === true ? null : err, data && data.key, data && data.value)
    })
  }
  else {
    return new Promise(function(resolve, reject) {
      return pull.drain(func, function(err) {
        if (err) {
          reject(err)
        }
        else {
          resolve([data && data.key, data && data.value])
        }
      })
    })
  }
}

exports.first = function(db, opts, cb) {
  opts = opts || {}
  opts.reverse = false
  opts.limit = 1

  return pull(pl.read(db, opts), first(cb))
}

exports.last = function(db, opts, cb) {
  opts = opts || {}
  opts.reverse = true
  opts.limit = 1

  return pull(pl.read(db, opts), first(cb))
}

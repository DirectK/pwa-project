const mongoose = require('mongoose')
var crypto = require('crypto')

const Schemas = require('./schemas')

// get mongo models
const Event = mongoose.model('Event', Schemas.Event)
const Story = mongoose.model('Story', Schemas.Story)

const DB_URL = 'mongodb://127.0.0.1:27017/db'

// connect to mongo database
mongoose.connect(DB_URL, { useNewUrlParser: true }).then(() => {
  // dummy db
  mongoose.connection.db.dropDatabase(function(err, result) { })
  new Event({ 
    name: "test",
    timestamp: new Date().getTime(), 
    sync: "teasaasdasd" 
  }).save((err) => { if (err) console.log(err) })
}).catch((err) => console.log(err))

const collections = { events: Event, stories: Story }
const syncCollections = ['events', 'stories']

// handle new (or updated) data for mongo db storage
const handleNewData = (socket, data) => {
  if (data && syncCollections.includes(data.type)) {
    const Collection = collections[data.type]
    let ids = []
    let timestamp = new Date().getTime()

    data.value.forEach((entry, i) => {
      ids.push(entry.id)
      delete entry.id

      if (entry.sync) {
        delete entry.synced
        Collection.findOne({ sync: entry.sync }, (err, doc) => {
          if (err) { console.log(err); return; }
          doc.update(entry, (err, doc) => {
            if (err) { console.log(err); return; }
            // TODO: update doc
          })
        })
      } else {
        const sync = crypto.createHash('md5').update("a" + timestamp++).digest('hex')
        Object.assign(entry, { sync, timestamp, synced: 1 })

        new Collection(entry).save((err) => {
          if (err) { console.log(err); return; }

          entry.id = ids[i]
          socket.emit('sync', {
            status: 'pending',
            type: data.type,
            value: [entry]
          })
        })
      }
    })
  }
}

const handleSync = (socket, data) => {
  if (data && syncCollections.includes(data.type)) {
    const lastTimestamp = data.timestamp
    const Collection = collections[data.type]
    let status = 'pending'

    Collection.find({ timestamp: { $gt: lastTimestamp }}, (err, docs) => {
      if (err) { console.log(err); return; }

      if (syncCollections.slice(-1)[0] == data.type) {
        status = 'complete'
      }

      socket.emit('sync', {
        status: status,
        type: data.type,
        value: docs
      })
    })
  }
}

exports.handleSocketEvent = (event, socket) => {
  switch (event) {
    case 'new' : return (data) => handleNewData(socket, data)
    case 'sync': return (data) => handleSync(socket, data)
  }
}

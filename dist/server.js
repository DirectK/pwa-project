const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const session = require('express-session')
const db = require('./db/db')

const fs = require('fs')

const port = 3000

const filesToIgnore = [
  '3rdpartylicenses.txt',
  'assets'
]

// set sessions
app.set('trust proxy', 1)
app.use(session({
  key: 'user_sid',
  secret: 'ZS7b0dwb22KoYwTi9lN5',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: 'auto', expires: 600000 }
}))

// app.use((req, res, next) => {
//   if (req.cookies.user_sid && !req.session.user) {
//       res.clearCookie('user_sid');        
//   }
//   next();
// });

io.on('connection', (socket) => {
  socket.on('new',  db.handleSocketEvent('new',  socket))
  socket.on('sync', db.handleSocketEvent('sync', socket))
})

// Handle static files
app.use(express.static(__dirname + '/pwa-project'))

// Handler for PWA caching
app.get('/urls_to_cache', (req, res) => {
  const dirPath = __dirname + "/pwa-project/"
  fs.readdir(dirPath, function (err, files) {
    if (err) {
      return console.log('Unable to scan directory: ' + err)
    }

    // remove files that do not need to be cached
    filesToIgnore.forEach(file => files.splice(files.indexOf(file), 1))
    files = files.map(file => '/' + file)
    
    res.send(files)
  })
})

// Request handler for Angular. 
app.get('*', (req, res) => {
  res.sendFile(__dirname + '/pwa-project/index.html')
})

http.listen(port, () => console.log(`PWA-project app listening on port ${port}!`))

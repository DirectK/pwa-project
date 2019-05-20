const express = require('express')
const cors = require('cors')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')(http)
const session = require('express-session')
const db = require('./db/db')
const bodyParser = require('body-parser')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const LocalStrategy = require('passport-local').Strategy;

const fs = require('fs')

const port = 3000
const corsOptions = {
}

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
  cookie: { secure: 'false', expires: 600000 }
}))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended':'false'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "localhost:4200");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
     next();
});
app.use(cors({
  origin: 'http://localhost:4200',
  credentials: true,
}));

passport.use(new LocalStrategy(
  function(username, password, cb) { //cb = callback
    db.findUser(username, function(err, user) {
      if (err) {
        console.log('err' + err)
        return cb(err)
      }
      if (!user) {
        console.log('user not found')
        return cb(null, false)
      }
      if (user.password != password) {
        console.log('password incorrect')
        return cb(null, false)
      }
      console.log('strategy success!')
      return cb(null, user)
    })
  }
))

passport.serializeUser(function(user, done) {
  console.log('serialzing into session.......')
  console.log(user.username)
  done(null, user.username);
});

passport.deserializeUser(function(username, done) {
  console.log('deserialise called')
  let user = db.findUser(username, function(err, user) {
    if (err) {
      console.log('err' + err)
      return done(err)
    }
    if (!user) {
      console.log('user not found')
      return done(null, false)
    }
    console.log('user found!')
    return done(null, user)
  })
});


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


app.post('/signup', function(req, res) {
  db.findUser(res.username, function(err, user) {
    if (!user) {
      console.log('user not found, signing up...')
      db.newUser(req.body.username, req.body.password)
      const token = jwt.sign({username: req.body.username}, 'nerd')
      return res.json({username: req.body.username, token});
    } else {
    console.log('user already exists...')
    }
  })
})

app.post('/authtest', function(req, res) {
  console.log(req.body.token)
  const token = req.body.token
  console.log('token: ' + token)
  jwt.verify(token, 'nerd', function(err, success) {
    if (err) {
      console.log('verify error:' + err)
      res.json({success: false})
    } else {
      res.json({success: true})
    }
  })
})

app.post('/login', passport.authenticate('local', {session: false}), function(req, res) {
  const token = jwt.sign({username: req.body.username}, 'nerd')
  console.log('authentication successful.')
  res.json({username: req.body.username, token: token, route: '/'});
})

app.get('/test', (req, res) => {
  res.json('test worked')
})

app.get('/logout',
  function(req, res){
    //req.logout();
    //res.redirect('/');
    res.json('yes')
  });



// Request handler for Angular. 
app.get('*', (req, res) => {
  res.sendFile(__dirname + '/pwa-project/index.html')
})

http.listen(port, () => console.log(`PWA-project server listening on port ${port}!`))

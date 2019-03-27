const express = require('express')
const app = express()
const fs = require('fs')
const port = 3000

const urlsToCache = [
  '/',
  '/sw.js',
  '/styles.41ba739f89304664995b.css',
  '/runtime.26209474bfa8dc87a77c.js',
  'polyfills.8bbb231b43165d65d357.js',
  'main.00099692d95ed8654ba8.js'
]

app.use(express.static('pwa-project'))

app.get('/urls_to_cache', (req, res) => {
  res.send(urlsToCache)
})

app.get('*', (req, res) => {
  const filePath = __dirname + "/pwa-project/" + req.params[0]
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      res.sendFile(__dirname + '/pwa-project/index.html')
    } else {
      res.sendFile(filePath)
    }
  });
})

app.listen(port, () => console.log(`PWA-project app listening on port ${port}!`))
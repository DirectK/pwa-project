const express = require('express')
const app = express()
const fs = require('fs')
const port = 3000

const filesToIgnore = [
  '3rdpartylicenses.txt',
  'assets'
]

app.use(express.static('pwa-project'))

app.get('/urls_to_cache', (req, res) => {
  const dirPath = __dirname + "/pwa-project/";
  fs.readdir(dirPath, function (err, files) {
    if (err) {
      return console.log('Unable to scan directory: ' + err);
    }

    filesToIgnore.forEach(file => files.splice(files.indexOf(file), 1));
    files = files.map(file => '/' + file);
    
    res.send(files)
  })
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
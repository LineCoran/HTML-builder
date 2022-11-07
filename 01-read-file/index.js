const fs = require("fs")
const path = require("path")
const readStream = fs.createReadStream(path.join(__dirname, 'text.txt'))
let text = '';
readStream.on('data', chunk => text = text + chunk);
readStream.on('end', () => console.log(text));
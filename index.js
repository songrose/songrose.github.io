let express = require('express');
let app = express();
app.get('/', (req, res) => res.send('Hello World!'));
app.listen(3000, () => console.log('Server ready'));
const fs = require('fs');
const readFile = util.promisify(fs.readFile);

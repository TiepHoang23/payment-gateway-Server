let express = require('express');
let cookieParser = require('cookie-parser');
const { createServer } = require('http');
let { attachRouter } = require('./routes');
const cors = require('cors');

const app = express();
// Set view engine
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static('public'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
const httpServer = createServer(app);

// app.use(express.static(path.join(__dirname, 'public')));
attachRouter(app);
// catch 404 and forward to error handler

app.use(function (req, res, next) {
  res.send('404 not found');
});

module.exports = httpServer;

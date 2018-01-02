const express = require('express');
const xss = require('xss');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const winston = require('winston');
const expressWinston = require('express-winston');
const test = require('../app/test/controller');

const port = process.argv[2] || 4000;

const contextPath = require('../config/config.json').contextPath;
console.log(`express start in ${port}`);

if(!port) {
	console.error('must have a port');
	console.error('server run failed');
}

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(cookieParser());//使用req.cookies获取cookie信息

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Strict-Transport-Security', 'max-age=172800');
  res.header('X-Frame-Options', 'DENY');
  res.header('X-XSS-Protection', '1; mode=block');
  res.header('X-Content-Type-Options', 'nosniff');
  next();
});

app.disable('x-powered-by');

app.use(expressWinston.logger({
  winstonInstance: logger,
  transports: [
    new winston.transports.Console({
      json: true,
      colorize: true
    })
  ],
  meta: true, // optional: control whether you want to log the meta data about the request (default to true)
  msg: "HTTP {{req.method}} {{req.url}}", // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
  expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
  colorize: false, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
  ignoreRoute: function (req, res) { return false; } // optional: allows to skip some log messages based on request and/or response
}));

app.get(contextPath, (request, response) => {
  logger.info('Hello World!');
  response.send('start');
});

app.use(contextPath, test);

const server = app.listen(Number(port), function () {
	console.log('app is running host: ' + server.address().address + '\n');
	console.log('app is running prot: ' + server.address().port);
});
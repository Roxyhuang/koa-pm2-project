const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { logger, accessLoggerMiddle } = require('../utils/log4jUtils');
const test = require('../app/test/controller');

const port = process.argv[2] || 4000;

const contextPath = require('../config/config.json').contextPath;
logger.info(`express start in ${port}`);

if(!port) {
  logger.error('must have a port');
  logger.error('server run failed');
}

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(cookieParser());// 使用req.cookies获取cookie信息

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

app.use(accessLoggerMiddle);

app.get(contextPath, (request, response) => {
  logger.info('start');
  response.send('start');
});

app.use(contextPath, test);

const server = app.listen(Number(port), function () {
  logger.info('app is running host: ' + server.address().address + '\n');
  logger.info('app is running port: ' + server.address().port);
});
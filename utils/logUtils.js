const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf } = format;
const expressWinston = require('express-winston');

const logger = createLogger({
  format: format.combine(
      format.splat(),
      format.simple()
  ),
  transports: [
    new transports.Console(),
    // new winston.transports.File({ filename: '/Users/neo/opt/log/access.log' })
  ]
});

const accessLog = createLogger({
  format: timestamp(),
  transports: [
    // new winston.transports.Console(),
    new transports.File({ filename: '/Users/neo/opt/log/access.log' })
  ]
});

const accessWinston = expressWinston.logger({
  winstonInstance: accessLog,
  // transports: [
  //   new winston.transports.Console({
  //     json: true,
  //     colorize: true
  //   })
  // ],
  meta: true,
  msg: "HTTP {{req.method}} {{req.url}} {{req.body}}",
  expressFormat: true,
  colorize: false,
  ignoreRoute: function (req, res) { return false; }
});

module.exports = {logger, accessWinston};
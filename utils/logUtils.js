/*

Author : Neo_Huang

Log levels:
  error: 0,
   warn: 1,
   info: 2,

You can use eg: logger.error('message');

*/

const { createLogger, format, transports } = require('winston');
const moment = require('moment');
const expressWinston = require('express-winston');
require('winston-daily-rotate-file');

// const transport = new (transports.DailyRotateFile)({
//   filename: './access.log',
//   datePattern: 'yyyy-MM-dd.',
//   prepend: true,
//   level: 'info'
// });

const logger = createLogger({
  transports: [
    new transports.Console(),
  ]
});

const accessLogFormat = format.printf(info => {
  return `${moment(info.timestamp).format('YYYY-MM-DD HH:mm Z')} level: ${info.level}  message: ${info.message} request: ${JSON.stringify(info.req)} response: ${JSON.stringify(info.res)}`;
});

const accessLog = createLogger({
  format: format.combine(
      accessLogFormat
  ),
  transports: [
    // transport
    new transports.File({json: true, filename: '/Users/neo/opt/log/access.log' })
  ]
});

expressWinston.requestWhitelist.push('body');

const accessWinston = expressWinston.logger({
  winstonInstance: accessLog,
  meta: true,
  expressFormat: true,

});

module.exports = {logger, accessWinston};
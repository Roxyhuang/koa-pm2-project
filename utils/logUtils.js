/*

Author : Neo_Huang

Log levels:
  error: 0,
   warn: 1,
   info: 2,

You can use eg: logger.error('message');

Winston 2.0

*/

const { Logger, format, transports } = require('winston');
const moment = require('moment');
const expressWinston = require('express-winston');
require('winston-daily-rotate-file');

const transport = new (transports.DailyRotateFile)({
  filename: './access.log',
  datePattern: '.yyyy-MM-dd-HH-mm',
  prepend: false,
  level: 'info'
});

const logger = new Logger({
  transports: [
    new transports.Console(),
  ]
});

logger.configure({
  transports: [
    new (require('winston-daily-rotate-file'))({
      filename: './access.log',
      datePattern: 'yyyy-MM-dd.',
      prepend: true,
      level: 'info'
    })
  ]
});

// const accessLogFormat = format.printf(info => {
//   return `${moment(info.timestamp).format('YYYY-MM-DD HH:mm Z')} level: ${info.level}  message: ${info.message} request: ${JSON.stringify(info.req)} response: ${JSON.stringify(info.res)}`;
// });

const accessLog = new Logger({
  formatter: function (info) {
    return `${moment(info.timestamp).format('YYYY-MM-DD HH:mm Z')} level: ${info.level}  message: ${info.message} request: ${JSON.stringify(info.req)} response: ${JSON.stringify(info.res)}`;

  },
  transports: [
    // new transports.File({json: true, filename: '/Users/neo/opt/log/access.log' })
    transport,
  ]
});

expressWinston.requestWhitelist.push('body');

const accessWinston = expressWinston.logger({
  winstonInstance: accessLog,
  meta: true,
  expressFormat: true,

});

module.exports = {logger, accessWinston};
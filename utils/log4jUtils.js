/*
  ALL: new Level(Number.MIN_VALUE, "ALL"),
  TRACE: new Level(5000, "TRACE"),
  DEBUG: new Level(10000, "DEBUG"),
  INFO: new Level(20000, "INFO"),
  WARN: new Level(30000, "WARN"),
  ERROR: new Level(40000, "ERROR"),
  FATAL: new Level(50000, "FATAL"),
  MARK: new Level(9007199254740992, "MARK"), // 2^53
  OFF: new Level(Number.MAX_VALUE, "OFF")
 */

const log4js = require('log4js');
const { filterPhone } = require('./filterUtils');
const isDebugger = require('../config/config.json').isDebugger || false;
const logPath = require('../config/config.json').logPath;

log4js.configure({
  appenders: {
    appFile: {
      type: 'DateFile',
      filename: `${logPath}/app-mkt-express`,
      pattern: '.yyyy-MM-dd.log',
      alwaysIncludePattern: true,
      layout: {
        type: 'pattern',
        pattern: '%d{[yyyy-MM-dd hh:mm ss]} [%p] %c - %m '
      }
    },
    accessFile: {
      type: 'DateFile',
      filename: `${logPath}/access`,
      pattern: '.yyyy-MM-dd.log',
      alwaysIncludePattern: true,
      layout: {
        type: 'pattern',
        pattern: '%d{[yyyy-MM-dd hh:mm ss]} [%p] %c - %m '
      }
    },
    console: {
      type: 'console',
      alwaysIncludePattern: true,
      layout: {
        type: 'pattern',
        pattern: '%d{[yyyy-MM-dd hh:mm ss]} [%p] %c - %m '
      }
    }
  },
  categories: {
    default: { appenders: [ 'appFile' ], level: 'info' },
    access: { appenders: [ 'accessFile' ], level: 'info' },
    defaultDev: { appenders: [ 'console' ], level: 'debug' },
    accessDev: { appenders: [ 'console' ], level: 'debug' },
  }
});

let accessLogger;

let logger;

if(isDebugger) {
  accessLogger = log4js.getLogger('accessDev');
  logger = log4js.getLogger('defaultDev');
} else {
  accessLogger = log4js.getLogger('access');
  logger = log4js.getLogger('default');
}

const accessLoggerMiddle = log4js.connectLogger(accessLogger, { level: log4js.levels.INFO, format: function(req,res){
  return filterPhone(`${req.ip} ${req.method} ${req.url} HTTP/: ${req.httpVersionMajor}.${req.httpVersionMinor} ${res.statusCode} ${res.getHeader('Content-Length', 10)}`)
}});

module.exports =  { logger, accessLoggerMiddle };
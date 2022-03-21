const log4js = require("log4js");
const path = require('path')
log4js.configure({
  appenders: {
    logConsole: { type: "console" },
    logErrorFile: { type: "file", filename: path.join(__dirname, 'log/error.log')  },
    logWarnFile: { type: "file", filename: path.join(__dirname, 'log/warn.log') },
  },
  categories: {
    default: { appenders: ["logConsole"], level: "info" },
    myError: { appenders: ["logErrorFile", "logConsole"], level: "error" },
    myWarn: { appenders: ["logWarnFile", "logConsole"], level: "warn" },
    myTrace: { appenders: ["logConsole"], level: "trace" },
  },
});

const loggers = {
  loggerDefault: log4js.getLogger(),
  loggerError: log4js.getLogger('myError'),
  loggerWarn: log4js.getLogger('myWarn'),
  loggerTrace: log4js.getLogger('myTrace'),
}

module.exports= loggers;
// module.exports = log4js;

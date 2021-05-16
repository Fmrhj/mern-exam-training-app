import winston from 'winston';

const {format, createLogger, transports} = winston

let customColors = {
    trace: 'white',
    debug: 'green',
    info: 'green',
    warn: 'yellow',
    crit: 'red',
    fatal: 'red'
  };
  
const loggerCustom = createLogger({
    levels: winston.config.npm.levels,
    format: format.combine(
        format.colorize(), // must go first
        format.label({ label: '[server]' }),
        format.timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
        format.printf(info => `${info.label} ${info.timestamp} ${info.level}: ${info.message}`),
        ),
    transports: [
        new transports.Console()]
    });

winston.addColors(customColors);

export default loggerCustom;
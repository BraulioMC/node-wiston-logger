const { createLogger, format, transports } = require('winston');
const winstonTimestampColorize = require('winston-timestamp-colorize');

// Logger
const logger = createLogger({
    transports: [
        new transports.File({
            filename: './logs/error.log',
            level: 'error',
            format: format.combine(
                format.splat(),
                format.json()
            )
        }),
        new transports.Http({
            level: 'warn',
            format: format.json()
        }),
        new transports.Console({
            level: 'debug',
            format: format.combine(
                format.splat(),
                format.colorize(),
                format.align(),
                format.timestamp(),
                winstonTimestampColorize({ color: 'blue' }),
                format.printf(info => `${info.timestamp} [${info.level}]: ${info.message}`)
            )
        })
    ]
});


// Testing
// info: test message my string {}
logger.log('info', 'test message %s', 'my string');

// info: test message my 123 {}
logger.log('warn', 'test message %d', 123);
// prints "Found error at %s"
logger.error('Found %s at %s', 'error', new Date());
logger.http('Found %s at %s', 'error', true);
logger.debug('Found %s at %s', 'error', 100.00);

// Export
module.exports = logger;

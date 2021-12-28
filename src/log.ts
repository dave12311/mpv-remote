import { Errback, NextFunction, Request, Response } from 'express';
import winston from 'winston';

const colorizer = winston.format.colorize();

const logger = winston.createLogger({
	levels: {
		error: 0,
		warn: 1,
		info: 2,
		debug: 4,
	},
	transports: [
		new winston.transports.Console({
			format: winston.format.combine(
				winston.format.printf((msg) =>
					colorizer.colorize(msg.level,
						                  `[${msg.level.toUpperCase()}]`.padEnd(7) + ` ${msg.message}`),
				),
				winston.format.colorize({all: true}),
			),
			level: 'debug',
		}),
	],
});

function logRequest(req: Request, res: Response, next: NextFunction): void {
	logger.info(req.url);
	next();
}

function logError(err: Errback, req: Request, res: Response, next: NextFunction): void {
	logger.error(err);
	next();
}

export default logger;
export { logRequest, logError };

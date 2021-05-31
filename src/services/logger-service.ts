import { transports, createLogger, format } from 'winston';
const { combine, colorize, splat, simple } = format;

const logConfiguration = {
  format: combine(
    colorize(),
    splat(),
    simple()
  ),
  transports: [
    new transports.Console()
  ]
};

export const logger = createLogger(logConfiguration);

import { WinstonModuleOptions } from "nest-winston";
import * as winston from "winston";

const { combine, timestamp, printf, colorize } = winston.format;

const logFormat = printf(({level, message, timestamp, context, trace}) => {
  return `[${timestamp}] [${context ?? 'Application'}] ${level}: ${message} ${trace ? `\n${trace}`: ''}`;
});

const isProduction = process.env.NODE_ENV === 'production';

const fileTransports = isProduction ? [] : [
  new winston.transports.File({
    filename: 'logs/combine.log',
    format: combine(
      timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
      logFormat,
    ),
  }),
  new winston.transports.File({
    filename: 'logs/error.log',
    level: 'error',
    format: combine(
      timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
      logFormat,
    ),
  }),
  new winston.transports.File({
    filename: 'logs/info.log',
    level: 'info',
    format: combine(
      timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
      logFormat,
    ),
  }),
];

export const winstonConfig: WinstonModuleOptions = {
  transports: [
    new winston.transports.Console({
      format: combine(
        colorize(),
        timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
        logFormat,
      ),
    }),
    ...fileTransports,  // empty array in production, file transports locally
  ],
};
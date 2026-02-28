import { WinstonModuleOptions } from "nest-winston";
import * as winston from "winston";

const { combine, timestamp, printf, colorize } = winston.format;

const logFormat = printf(({level, message, timestamp, context, trace}) => {
    return `[${timestamp}] [${context ?? 'Application'}] ${level}: ${message} ${trace ? `\n${trace}`: ''}`;
});

export const winstonConfig: WinstonModuleOptions = {
    transports: [
        //console logs
        new winston.transports.Console({
            format: combine(
                colorize(),
                timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
                logFormat,
            ),
        }),

        //all logs to combine logs
        new winston.transports.File({
            filename: 'logs/combine.log',
            format: combine(
                timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
                logFormat,
            ),
        }),

        //Error logs to error log
        new winston.transports.File({
            filename: 'logs/error.log',
            format: combine(
                timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
                logFormat,
            ),
        }),

        //info logs to info log
        new winston.transports.File({
            filename: 'logs/info.log',
            format: combine(
                timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
                logFormat,
            ),
        }),
    ],
};




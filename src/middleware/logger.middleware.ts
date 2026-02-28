import { Inject, Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { WINSTON_MODULE_NEST_PROVIDER } from "nest-winston";
import { Logger } from "winston";


@Injectable()
export class LoggerMiddleware implements NestMiddleware{
    constructor(
        @Inject(WINSTON_MODULE_NEST_PROVIDER)
        private readonly logger: Logger,
    ){}

    use(req: Request, res: Response, next: NextFunction){
        const {method, originalUrl, ip, body} = req;

        const userAgent = req.get('user-agent') || '';
        const start = Date.now();

        res.on('finish', () => {
            const {statusCode } = res;
            const duration = Date.now() - start;

            this.logger.log(`${method} ${originalUrl} ${statusCode} - ${duration}ms | IP: ${ip} | Agent: ${userAgent}`, 'HTTP');
        });
        next();
    }
}
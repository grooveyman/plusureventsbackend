import { Inject, Injectable, NestMiddleware } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { WINSTON_MODULE_NEST_PROVIDER } from "nest-winston";
import { Logger } from "winston";
import { Request, Response, NextFunction } from "express";


@Injectable()
export class JwtMiddleware implements NestMiddleware{
    constructor(
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
        @Inject(WINSTON_MODULE_NEST_PROVIDER)
        private readonly logger: Logger,
    ){}

    use(req: Request, res: Response, next: NextFunction){
        const token = req.cookies?.access_token;

        if(!token){
            return res.status(401).json({
                success: false,
                message: 'Unauthorized - No token provided',
            });
        }

        try{
            const payload = this.jwtService.verify(token, {
                secret: this.configService.get('JWT_SEC'),
            });
            req['user'] = payload;
            next();
        }catch(err:any){
            this.logger.error('access token verification failed', err.stack, JwtMiddleware.name);
            return res.status(401).json({success: false, message: 'Unauthroized - Invalid or expired token'});
        }
    }
}
import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";


@Injectable()
export class EmailVerificationMiddleware implements NestMiddleware{
    use(req: Request, res: Response, next: NextFunction){
        const user = req['user'];

        if(!user){
            return res.status(401).json({success: false, message: 'Un authorized'});
        }

        if(!user.isEmailVerified){
            return res.status(403).json({
                success: false, 
                message: 'Forbidden - Please verify your email first'
            });
        }

        next();
    }
}
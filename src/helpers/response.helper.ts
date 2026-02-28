import { HttpStatus } from "@nestjs/common";
import { Response } from "express";


export class ResponseHelper{
    static success(res: Response, message: string, data: any, status: HttpStatus = HttpStatus.OK){
        return res.status(status).json({
            success: true,
            message,
            data
        });
    }

    static error(res: Response, message: string, status: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR, error?: any){
        return res.status(status).json({
            success: false,
            message,
            error: error ?? null,
            data: []
        });
    }

    static notFound(res:Response, message: string = 'No records found', status: HttpStatus = HttpStatus.NOT_FOUND){
        return res.status(status).json({
            success: false,
            message,
            data:[]
        });
    }
}
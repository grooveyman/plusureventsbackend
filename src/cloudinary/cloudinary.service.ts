import { Inject, Injectable } from "@nestjs/common";
import { UploadApiResponse } from "cloudinary";
import { WINSTON_MODULE_NEST_PROVIDER } from "nest-winston";
import { Readable } from "stream";
import { Logger } from "winston";
import { v2 as cloudinary } from 'cloudinary';


@Injectable()
export class CloudinaryService {
    constructor(@Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: Logger) { }

    async uploadImage(file: Express.Multer.File, folder: string = 'general'): Promise<UploadApiResponse> {
        return new Promise((resolve, reject) => {
            const upload = cloudinary.uploader.upload_stream({
                folder,
                resource_type: 'image',
                transformation: [
                    { width: 800, height: 800, crop: 'limit' },
                    { quality: 'auto' },
                    { fetch_format: 'auto' },
                ],
            },
                (error, result) => {
                    if (error) {
                        this.logger.error('Cloudinary upload failed', error, CloudinaryService.name);
                        reject(error);
                    }
                    if (!result) {
                        return reject(new Error('Upload failed - no result returned'));
                    }

                    this.logger.log(`Image uploaded to ${result.secure_url}`, CloudinaryService.name);
                    resolve(result);
                },
            );

            //convert buffer to stream and pipe to cloudinary
            const stream = Readable.from(file.buffer);
            stream.pipe(upload);
        });
    }

    async deleteImage(publicId: string): Promise<void> {
        try {
            await cloudinary.uploader.destroy(publicId);
            this.logger.log(`Image deleted: ${publicId}`, CloudinaryService.name);
        } catch (err) {
            this.logger.error(`Failed to delete image: ${publicId}`, err.stack, CloudinaryService.name);
            throw err;

        }
    }
}
import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';

@Injectable()
export default class CloudinaryService {
  async uploadImage(
    file: Express.Multer.File,
    folder: string = 'kino',
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      if (!file || !file.buffer) {
        return reject(new Error('Invalid file buffer'));
      }

      const stream = cloudinary.uploader.upload_stream(
        {
          folder,
          resource_type: 'auto',
        },
        (error, result) => {
          if (error) {
            return reject(new Error(error.message));
          }
          if (result?.secure_url) {
            return resolve(result.secure_url);
          }

          return reject(new Error('Failed to get secure_url from Cloudinary'));
        },
      );

      // FIX DEFINITIVO
      const readable = Readable.from(file.buffer);
      readable.pipe(stream);
    });
  }
}

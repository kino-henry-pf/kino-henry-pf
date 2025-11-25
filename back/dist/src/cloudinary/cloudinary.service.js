"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const cloudinary_1 = require("cloudinary");
const stream_1 = require("stream");
let CloudinaryService = class CloudinaryService {
    async uploadImage(file, folder = 'kino') {
        return new Promise((resolve, reject) => {
            if (!file || !file.buffer) {
                return reject(new Error('Invalid file buffer'));
            }
            const stream = cloudinary_1.v2.uploader.upload_stream({
                folder,
                resource_type: 'auto',
            }, (error, result) => {
                if (error) {
                    return reject(new Error(error.message));
                }
                if (result?.secure_url) {
                    return resolve(result.secure_url);
                }
                return reject(new Error('Failed to get secure_url from Cloudinary'));
            });
            const readable = stream_1.Readable.from(file.buffer);
            readable.pipe(stream);
        });
    }
};
CloudinaryService = __decorate([
    (0, common_1.Injectable)()
], CloudinaryService);
exports.default = CloudinaryService;
//# sourceMappingURL=cloudinary.service.js.map
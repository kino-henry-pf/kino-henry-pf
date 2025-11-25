export default class CloudinaryService {
    uploadImage(file: Express.Multer.File, folder?: string): Promise<string>;
}

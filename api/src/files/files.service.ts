import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as uuid from 'uuid';




@Injectable()
export class FilesService {
  async createFile(images: Express.Multer.File[]): Promise<string> {

    try {
      const imageFormat = images.map((image) => image.originalname.split('.'[1]))
      const imageName = uuid.v4() + '.' + imageFormat;
      const filePath = path.resolve(__dirname, '..', 'static');
      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }
      for (const image of images) {
        fs.writeFileSync(path.join(filePath, imageName), image.buffer)
      }
      /*   const imageFormat = images.map((image) => image.originalname.split('.'[1]))
        //const imageFormat = images.originalname.split('.')[1];
        const imageName = uuid.v4() + '.' + imageFormat;
        const filePath = path.resolve(__dirname, '..', 'static');
        if (!fs.existsSync(filePath)) {
          fs.mkdirSync(filePath, { recursive: true });
        }
        fs.writeFileSync(path.join(filePath, imageName), imageFormat.push(buffer)); */
      return imageName;

    } catch (e) {
      throw new HttpException(
        'Произошла ошибка при записи изображения',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async updateFile(
    images: Express.Multer.File,
    lastImageName: string,
  ): Promise<string> {
    try {
      const filePath = path.resolve(__dirname, '..', 'static');
      fs.unlink(path.join(filePath, lastImageName), (error) => {
        if (error) {
          console.log('Произошла ошибка при удалении старого файла ' + error);
        }
      });
      const imageFormat = images.originalname.split('.')[1];
      const imageName = uuid.v4() + '.' + imageFormat;
      fs.writeFileSync(path.join(filePath, imageName), images.buffer);
      return imageName;
    } catch (e) {
      throw new HttpException(
        'Произошла ошибка при обновлении изображения',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

import { Request } from 'express';

export const fileNamer = async (
  req: Request,
  file: Express.Multer.File,
  callback: Function,
) => {
  if (!file) return callback(new Error('File is empty'), false);

  const fileExtension = file.mimetype.split('/')[1];
  const { v4: uuid } = await import('uuid');
  const fileName = `ImgProduct${uuid()}.${fileExtension}`;

  callback(null, fileName);
};

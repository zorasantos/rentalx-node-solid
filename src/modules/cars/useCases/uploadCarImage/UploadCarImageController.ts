import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UploadCarImageUseCase } from './UploadCarImageUseCase';

interface IFiles {
  filename: string;
}

class UploadCarImageController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const images = req.files as IFiles[];

    const uploadCarImageUseCase = container.resolve(UploadCarImageUseCase);

    const image_name = images.map((image) => image.filename);

    await uploadCarImageUseCase.execute({
      car_id: id,
      image_name
    });

    return res.status(201).json({ message: 'Image uploaded successfully' });
  }
}

export { UploadCarImageController };

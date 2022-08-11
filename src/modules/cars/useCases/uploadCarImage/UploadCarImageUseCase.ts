import { inject, injectable } from 'tsyringe';

import { ICarsImagesRepository } from '@modules/cars/repositories/ICarsImagesRepository';

interface IRequest {
  car_id: string;
  image_name: string[];
}

@injectable()
class UploadCarImageUseCase {
  constructor(
    @inject('CarsImagesRepository')
    private carsImagesRepository: ICarsImagesRepository
  ) {}

  // eslint-disable-next-line @typescript-eslint/require-await
  async execute({ car_id, image_name }: IRequest): Promise<void> {
    image_name.map(async (image) => {
      await this.carsImagesRepository.create(car_id, image);
    });
  }
}

export { UploadCarImageUseCase };

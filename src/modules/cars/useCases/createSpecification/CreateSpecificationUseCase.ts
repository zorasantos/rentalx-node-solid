import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../errors/AppError';
import { SpecificationsRepository } from '../../repositories/implementations/SpecificationsRepositories';

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateSpecificationUseCase {
  constructor(
    @inject('SpecificationsRepository')
    private specificationsRepository: SpecificationsRepository
  ) {}

  async execute({ description, name }: IRequest): Promise<void> {
    const specificationAlreadyExists = await this.specificationsRepository.findByName(name);

    if (specificationAlreadyExists) {
      throw new AppError('Specification already exists!');
    }

    await this.specificationsRepository.create({
      description,
      name
    });
  }
}

export { CreateSpecificationUseCase };

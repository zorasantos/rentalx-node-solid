import { inject, injectable } from 'tsyringe';

import { SpecificationsRepository } from '../../repositories/implementations/SpecificationsRepositories';

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateSpecificationUseCase {
  constructor(
    @inject('SpecificationRepository')
    private specificationsRepository: SpecificationsRepository
  ) {}

  execute({ description, name }: IRequest): void {
    const specificationAlreadyExists = this.specificationsRepository.findByName(name);

    if (specificationAlreadyExists) {
      throw new Error('Specification already exists!');
    }

    this.specificationsRepository.create({
      description,
      name
    });
  }
}

export { CreateSpecificationUseCase };

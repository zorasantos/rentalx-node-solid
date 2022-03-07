import { hash } from 'bcrypt';
import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../errors/AppError';
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { IUsersRepository } from '../../repositories/IUsersRepository';

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) {}

  async execute({ name, email, password, driver_license }: ICreateUserDTO): Promise<void> {
    const userAlreadyExisits = await this.usersRepository.findByEmail(email);

    if (userAlreadyExisits) {
      throw new AppError('User already exist!');
    }

    const passwordWithHash = await hash(password, 8);

    await this.usersRepository.create({
      name,
      email,
      password: passwordWithHash,
      driver_license
    });
  }
}

export { CreateUserUseCase };

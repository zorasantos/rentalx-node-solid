import { hash } from 'bcrypt';
import { inject, injectable } from 'tsyringe';

import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { AppError } from '@shared/errors/AppError';

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

import { AppError } from '@shared/errors/AppError';
import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { UserRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UserRepositoryInMemory';

import { CreateUserUseCase } from '../createUser/CreateUserUseCase';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

let authenticateUserUseCase: AuthenticateUserUseCase;
let userRepositoryInMemory: UserRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;

describe('Authenticate user', () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory();
    authenticateUserUseCase = new AuthenticateUserUseCase(userRepositoryInMemory);
    createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);
  });

  test('should be able to authenticate an user', async () => {
    const user: ICreateUserDTO = {
      driver_license: '000123',
      email: 'test@email.com',
      name: 'Test User',
      password: '1234'
    };

    await createUserUseCase.execute(user);

    const result = await authenticateUserUseCase.execute({
      email: user.email,
      password: user.password
    });

    expect(result).toHaveProperty('token');
  });

  test('should not be able to authenticate an nonexistent user', () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: 'false@email.com',
        password: '1234'
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  test('should not be able to authenticate with incorrect password', () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        driver_license: '000567',
        email: 'user@email.com',
        name: 'User test error',
        password: '1234'
      };

      await createUserUseCase.execute(user);

      await authenticateUserUseCase.execute({
        email: 'user@email.com',
        password: 'incorrectPassword'
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  test('should not be able to authenticate with incorrect email', () => {
    expect(async () => {
      const user: ICreateUserDTO = {
        driver_license: '000567',
        email: 'user@email.com',
        name: 'User test error',
        password: '1234'
      };

      await createUserUseCase.execute(user);

      await authenticateUserUseCase.execute({
        email: 'incorrectemail@email.com',
        password: '1234'
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});

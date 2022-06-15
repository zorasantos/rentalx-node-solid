import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';
import { AppError } from '@shared/errors/AppError';

import { CreateCarUseCase } from './CreateCarUseCase';

let createCarUseCase: CreateCarUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

const newCar = {
  name: 'Name Car',
  description: 'Description Car',
  daily_rate: 100,
  license_plate: 'ABC-1234',
  fine_amount: 60,
  brand: 'Brand',
  category_id: 'category'
};

describe('Create Car', () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  });

  test('should be able to create a new car', async () => {
    const car = await createCarUseCase.execute(newCar);
    expect(car).toHaveProperty('id');
  });

  test('should not be able to create a car with exists license plate', () => {
    expect(async () => {
      await createCarUseCase.execute(newCar);
      await createCarUseCase.execute(newCar);
    }).rejects.toBeInstanceOf(AppError);
  });

  test('should be able to create a car with available true by default', async () => {
    const car = await createCarUseCase.execute(newCar);

    expect(car.available).toBe(true);
  });
});

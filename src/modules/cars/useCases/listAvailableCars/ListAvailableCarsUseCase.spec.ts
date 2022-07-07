import { CarsRepositoryInMemory } from '@modules/cars/repositories/in-memory/CarsRepositoryInMemory';

import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase';

let listCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

const objCar = {
  name: 'Car 1',
  description: 'Description Car',
  daily_rate: 100,
  license_plate: 'ABC-1234',
  fine_amount: 60,
  brand: 'Brand',
  category_id: 'category'
};

describe('List Cars UseCase', () => {
  beforeAll(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory);
  });

  test('should be able to list available cars', async () => {
    const car = await carsRepositoryInMemory.create(objCar);

    const cars = await listCarsUseCase.execute({});

    expect(cars).toEqual([car]);
    expect(cars[0]).toHaveProperty('available');
    expect(cars[0].available).toBe(true);
  });

  test('should be able to list available cars by name', async () => {
    let { ...data } = objCar;
    data = { ...data, name: 'Car2' };
    const car = await carsRepositoryInMemory.create(data);

    const cars = await listCarsUseCase.execute({
      name: 'Car2'
    });

    expect(cars[1]).toEqual(car);
    expect(cars[1]).toHaveProperty('available');
    expect(cars[1].name).toBe('Car2');
  });

  test('should be able to list available cars by category', async () => {
    let { ...data } = objCar;
    data = { ...data, category_id: 'xxxx-xxx-xxx' };
    const car = await carsRepositoryInMemory.create(data);

    const cars = await listCarsUseCase.execute({
      category_id: 'xxxx-xxx-xxx'
    });

    expect(cars[2]).toEqual(car);
    expect(cars[2]).toHaveProperty('available');
    expect(cars[2].category_id).toBe('xxxx-xxx-xxx');
  });

  test('should be able to list available cars by brand', async () => {
    let { ...data } = objCar;
    data = { ...data, brand: 'Brand test' };
    const car = await carsRepositoryInMemory.create(data);

    const cars = await listCarsUseCase.execute({
      brand: 'Brand test'
    });

    expect(cars[3]).toEqual(car);
    expect(cars[3]).toHaveProperty('available');
    expect(cars[3].brand).toBe('Brand test');
  });
});

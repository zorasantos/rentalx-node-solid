import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase';

class CreateCarSpecificationController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { specification_id } = req.body;

    const createCarSpecificationUseCase = container.resolve(CreateCarSpecificationUseCase);
    const cars = await createCarSpecificationUseCase.execute({
      car_id: id,
      specification_id
    });

    return res.json(cars);
  }
}

export { CreateCarSpecificationController };

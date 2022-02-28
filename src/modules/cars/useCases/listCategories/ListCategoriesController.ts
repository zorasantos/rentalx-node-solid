import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListCategoryUseCase } from './ListCategoryUseCase';

class ListCategoriesController {
  async handle(req: Request, res: Response): Promise<Response> {
    const listCategoryUseCase = container.resolve(ListCategoryUseCase);

    const all = await listCategoryUseCase.execute();
    return res.json(all);
  }
}

export { ListCategoriesController };

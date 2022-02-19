import { Router } from 'express';

import { createCategoryController } from '../modules/cars/useCases/CreateCategory';
import { listCategoriesController } from '../modules/cars/useCases/ListCategories';

const categoriesRoutes = Router();

categoriesRoutes.post('/', (req, res) => {
  return createCategoryController.handle(req, res);
});

categoriesRoutes.get('/list', (req, res) => {
  return listCategoriesController.handle(req, res);
});

export { categoriesRoutes };

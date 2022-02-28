import { Router } from 'express';

import { CreateSpecificationController } from '../modules/cars/useCases/createSpecification/CreateSpecificationController';

const specificationsRoutes = Router();

const createSpecificationController = new CreateSpecificationController();

specificationsRoutes.post('/', createSpecificationController.handle);

// categoriesRoutes.get('/list', (req, res) => {
//   const all = categoriesRepository.list();
//   return res.json(all);
// });

export { specificationsRoutes };

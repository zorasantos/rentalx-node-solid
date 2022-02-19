import { Router } from 'express';

import { createSpecificationController } from '../modules/cars/useCases/CreateSpecification';

const specificationsRoutes = Router();

specificationsRoutes.post('/', (req, res) => {
  return createSpecificationController.handle(req, res);
});

// categoriesRoutes.get('/list', (req, res) => {
//   const all = categoriesRepository.list();
//   return res.json(all);
// });

export { specificationsRoutes };

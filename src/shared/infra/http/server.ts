import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import swaggerUi from 'swagger-ui-express';

import '@shared/infra/typeorm';
import '@shared/container/index';

import { AppError } from '@shared/errors/AppError';
import { router } from '@shared/infra/http/routes';

import swaggerFile from '../../../swagger.json';

const app = express();
app.use(express.json());

app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(router);
app.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      message: err.message
    });
  }
  return res.status(500).json({
    status: 'error',
    message: `Internal server error - ${err.message}`
  });
});
app.listen(3000);

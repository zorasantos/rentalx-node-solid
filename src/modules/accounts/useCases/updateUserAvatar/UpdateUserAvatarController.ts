import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { IRequest, UpdateUserAvatarUseCase } from './UpdateUserAvatarUseCase';

class UpdateUserAvatarController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { id: user_id } = req.user;

    const avatar_file = req.file?.filename;

    const updateUserAvatarUseCase = container.resolve(UpdateUserAvatarUseCase);

    await updateUserAvatarUseCase.execute({ user_id, avatar_file } as IRequest);

    return res.status(204).send();
  }
}

export { UpdateUserAvatarController };

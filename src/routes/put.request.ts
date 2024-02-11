import { IncomingMessage, ServerResponse } from 'http';

import { validateUserId } from '../utils/validate.user.id';
import { getUserId } from '../utils/get.user.id';
import localDataBase from '../data-base/local.data.base';
import { IUserInterfaceWithId } from '../interfaces/user.interfaces';
import { validateBody } from '../utils/validate.body';

export const updateUserById = (
    res: ServerResponse<IncomingMessage> & { req: IncomingMessage },
    url: string | undefined,
    body: IUserInterfaceWithId,
) => {
    const isUserIdValid = validateUserId(url);

    if (!isUserIdValid) {
        res.writeHead(404);
        return res.end('Bad Request');
    }

    const isBodyValid = validateBody<IUserInterfaceWithId>(body);

    if (!isBodyValid) {
        res.writeHead(404);
        return res.end('Bad Request');
    }

    const userId = getUserId(url!);

    const objIndex = localDataBase.findIndex((item) => item.id === userId);
    const updatedObj = { ...localDataBase[objIndex], ...body };
    delete localDataBase[objIndex];
    localDataBase[objIndex] = updatedObj;

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify(updatedObj));
    return res.end();
};

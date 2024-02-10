import { IncomingMessage, ServerResponse } from 'http';

import { validateUserId } from '../utils/validate.user.id';
import { getUserId } from '../utils/get.user.id';
import { localDataBase } from '../data-base/local.data.base';

export const deleteUserById = (
    res: ServerResponse<IncomingMessage> & { req: IncomingMessage },
    url: string | undefined,
) => {
    const isUserIdValid = validateUserId(url);

    if (!isUserIdValid) {
        res.writeHead(404);
        return res.end('Bad Request');
    }

    const userId = getUserId(url!);

    const objIndex = localDataBase.findIndex((item) => item.id === userId);
    localDataBase.splice(objIndex, 1);

    res.writeHead(204);
    return res.end();
};

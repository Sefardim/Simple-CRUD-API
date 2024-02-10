import { IncomingMessage, ServerResponse } from 'http';

import { localDataBase } from '../data-base/local.data.base';
import { validateUserId } from '../utils/validate.user.id';
import { getUserId } from '../utils/get.user.id';

export const getAllUsers = (
    res: ServerResponse<IncomingMessage> & { req: IncomingMessage },
) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify(localDataBase));
    return res.end();
};

export const getUserById = (
    res: ServerResponse<IncomingMessage> & { req: IncomingMessage },
    url: string | undefined,
) => {
    const isUserIdValid = validateUserId(url);

    if (!isUserIdValid) {
        res.writeHead(404);
        return res.end('Bad Request');
    }

    const userId = getUserId(url!);

    const currentUser = localDataBase.find((item) => item.id === userId);

    if (currentUser) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify(currentUser));
        return res.end();
    }

    res.writeHead(404);
    return res.end('Not Found');
};

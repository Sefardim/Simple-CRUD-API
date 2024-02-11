import { IncomingMessage, ServerResponse } from 'http';
import { v4 as uuidv4 } from 'uuid';

import {
    IUserInterface,
    IUserInterfaceWithId,
} from '../interfaces/user.interfaces';
import { validateBody } from '../utils/validate.body';
import localDataBase from '../data-base/local.data.base';

export const postUser = (
    res: ServerResponse<IncomingMessage> & { req: IncomingMessage },
    body: IUserInterface,
) => {
    const isBodyValid = validateBody<IUserInterface>(body);

    if (isBodyValid) {
        const user: IUserInterfaceWithId = {
            ...body,
            id: uuidv4(),
        };

        localDataBase.push(user);

        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify(user));
        return res.end();
    }

    res.writeHead(400);
    return res.end('Bad Request');
};

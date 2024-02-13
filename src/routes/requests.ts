import { IncomingMessage, ServerResponse } from 'http';

const baseurl = '/api/users';
import { IUserInterfaceWithId } from '../interfaces/user.interfaces';
import { getAllUsers, getUserById } from './get.request';
import { postUser } from './post.request';
import { updateUserById } from './put.request';
import { deleteUserById } from './delete.request';

export const requests = (
    req: IncomingMessage,
    res: ServerResponse<IncomingMessage> & { req: IncomingMessage },
) => {
    const url = req.url;
    const method = req.method;
    const currentUrl = url?.startsWith(baseurl);
    let data = '';
    let body = {} as IUserInterfaceWithId;

    req.on('data', (chunk) => {
        data += chunk;
    });

    req.on('end', async () => {
        if (data) {
            body = JSON.parse(data);
        }

        if (url === baseurl && method === 'GET') {
            return getAllUsers(res);
        }

        if (url === baseurl && method === 'POST') {
            return postUser(res, body);
        }

        if (currentUrl && method === 'GET') {
            return getUserById(res, url);
        }

        if (currentUrl && method === 'PUT') {
            return updateUserById(res, url, body);
        }

        if (currentUrl && method === 'DELETE') {
            return deleteUserById(res, url);
        }

        res.writeHead(404);
        return res.end('Not Found');
    });
};

import { IncomingMessage, ServerResponse } from 'http';

export const catchError = (
    res: ServerResponse<IncomingMessage> & { req: IncomingMessage },
) => {
    process.on('uncaughtException', () => {
        res.writeHead(500);
        res.write('Internal server error');
        return res.end();
    });
};

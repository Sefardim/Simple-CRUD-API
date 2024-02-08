import { createServer } from 'node:http';

const server = createServer((req, res) => {
    console.log(req);
    res.end('Hello World');
});

server.listen(3000, () => console.log('Port is running on 3000'));

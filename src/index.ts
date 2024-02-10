import { createServer } from 'node:http';
import cluster from 'node:cluster';
import { cpus } from 'node:os';

import 'dotenv/config';
import { requests } from './routes/requests';

const numCPUs = cpus().length;
const port = Number(process.env.PORT);
const multiServerOn = process.env.MULTI;

if (multiServerOn) {
    if (cluster.isPrimary) {
        let mainCluster = cluster.fork({ workerPort: port });

        mainCluster.on('exit', () => {
            mainCluster = cluster.fork({ workerPort: port });
        });

        console.log(`Primary ${process.pid} is running`);
        const pidToPort: any = {};

        for (let i = 0; i < numCPUs; i++) {
            const workerPort = port + i + 1;
            const worker: any = cluster.fork({ workerPort });
            pidToPort[worker.process.pid] = workerPort;
        }
        //
        // cluster.on('exit', (worker, code, signal) => {
        //     console.log(code, signal);
        //     console.log(`worker ${worker.process.pid} died`);
        //     cluster.fork();
        // });
    } else {
        createServer((req, res) => {
            requests(req, res);
        }).listen(port);

        console.log(`Worker ${process.pid} started ${process.env.workerPort}`);
    }
} else {
    createServer((req, res) => {
        requests(req, res);
    }).listen(port);

    console.log(`Server listen ${port} port`);
}

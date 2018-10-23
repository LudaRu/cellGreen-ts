import {createServer, Server} from 'http';
import * as express from 'express';
import * as socketIo from 'socket.io';
import * as path from 'path';

import {IndexRoute} from './routes/index';
import {IndexSocket} from './socket/IndexSocket';

export class GeneralServer {
    public static readonly PORT: number = 8080;
    private server: Server;
    private port: string | number;

    public app: express.Application;

    public static bootstrap(): Server {
        return new Server();
    }

    constructor() {
        this.app = express();
        this.createServer();
        this.configApp();
        this.routes();
        this.startListen();
    }

    public getApp(): express.Application {
        return this.app;
    }

    private createServer(): void {
        this.server = createServer(this.app);
    }

    public configApp() {
        this.port = process.env.PORT || GeneralServer.PORT;
        this.app.use(express.static(path.join(__dirname, "public")));
    }

    private routes() {
        let router: express.Router;
        router = express.Router();

        IndexRoute.create(router);
        this.app.use(router);
    }

    private startListen(): void {
        this.server.listen(this.port, () => {
            console.log('сервер хез бин стартед %s', this.port);
        });

        new IndexSocket(socketIo(this.server));
    }
}
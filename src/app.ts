import { createServer, Server } from "http";
import express from "express";
import socketIo from "socket.io";
import * as path from "path";

import * as Addons from "./addons/testAddon";

import { IndexRoute } from "./routes/index";
import { IndexSocket } from "./socket/IndexSocket";

export class App {
    public static readonly PORT: number = 8080;
    private server: Server;
    private port: string | number;
    public app: express.Application;

    public static bootstrap() {
        new App();
    }

    constructor() {
        this.app = express();
        this.createServer();
        this.initAddons();
        this.configApp();
        this.routes();
        this.startListen();
    }

    private createServer(): void {
        this.server = createServer(this.app);
    }

    public configApp() {
        this.port = process.env.PORT || App.PORT;
        this.app.use(express.static(path.join(__dirname, "public")));
    }

    public initAddons() {
        console.log("test c++", Addons.testAddon.hello());
    }

    private routes() {
        let router: express.Router;
        router = express.Router();

        IndexRoute.create(router);
        this.app.use(router);
    }

    private startListen(): void {
        this.server.listen(this.port, () => {
            console.log(`сервер хез бин стартед http://127.0.0.1:${this.port}`);
        });
        new IndexSocket(socketIo(this.server));
    }
}
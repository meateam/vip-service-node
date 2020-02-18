import * as express from 'express';
import * as helmet from 'helmet';
import * as bodyParser from 'body-parser';
import * as http from 'http';
import { myRouter } from './router';

export class Server {
    public app: express.Application;
    private server: http.Server;

    constructor() {
        this.app = express();
        this.initMiddlewares();
        this.initRoutes();
        this.server = http.createServer(this.app);
        this.server.listen(5000, () => {
            console.log('Server running on port 5000');
        });
        console.log('constructor finished!');
    }

    private initMiddlewares() {
        this.app.use(helmet());

        this.app.use(function (req: express.Request, res: express.Response, next: express.NextFunction) {

            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Credentials', 'true');
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
            res.setHeader('Access-Control-Allow-Headers', 'Authorization, Origin, X-Requested-With, Content-Type');

            if (req.method === 'OPTIONS') {
                return res.status(200).end();
            }

            return next();
        });

        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));
    }

    private initRoutes() {
        this.app.use('/api/try', myRouter);
    }

}

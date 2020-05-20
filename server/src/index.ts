import express, { Application } from 'express';
import indexRoutes from './routes/indexRoutes';
import gamesRoutes from './routes/gamesRoutes';
import morgan from 'morgan';
import cors from 'cors';
import { urlencoded } from 'body-parser';

class Server {

    public app: Application;

    constructor(){
        this.app = express();
        this.config();
        this.routes();
    }

    private config(): void {
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(morgan('dev'));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(urlencoded({extended: false}));
    }

    private routes(): void {
        this.app.use('/', indexRoutes);
        this.app.use('/api/games', gamesRoutes);
    }

    public start(): void {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port', this.app.get('port'));
        });
    }

}

const server = new Server();
server.start();
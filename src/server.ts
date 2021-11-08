import * as express from 'express';
import * as mongoose from 'mongoose';
import * as cors from 'cors';
import './config/passport';
import * as passport from 'passport';
import { AuthRouter } from './router/auth/auth';
import { ProjectRouter } from './router/project/project';
import { WorkLoadsRouter } from './router/workLoads/workLoads';
require('dotenv-json-complex')();

class Server {

    public app: express.Application;
    dbUri = process.env.DB_URI;
    constructor () {
      this.db();
      this.app = express();
      this.config();
      this.routes();
    }

    public config() : void {
      this.app.use(express.urlencoded({ extended : false }));
      this.app.use(express.json());
      this.app.use(cors());        
      this.app.use(passport.initialize());
    }

    public db() : void {
      mongoose.connect(this.dbUri, {})
        .then(() =>  {
          console.log('Connected to db!!!');
        })
        .catch((err) => console.error('Connection Error', err));
    }

    public routes() : void {
      const router: express.Router = express.Router();

      this.app.use('/', router);
      this.app.use('/auth', new AuthRouter().route());
      this.app.use('/project', passport.authenticate('jwt', { session: false }), new ProjectRouter().route());
      this.app.use('/work', passport.authenticate('jwt', { session: false }), new WorkLoadsRouter().route());

      this.app.use(function(req, res, next) {
        res.status(400).json({ messages:'Not Found' });
      });
    }

}

export default new Server().app;

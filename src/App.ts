import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import { Injectable, Inject } from 'ontime-di';
import { Validator } from 'ontime-validator';
import { Settings } from './common/Settings';
import { Logger } from './common/Logger';
import { NotFoundError } from './errors/NotFound';
import { AuthError } from './errors/Auth';
import { PostError } from './errors/Post';
import { attach } from './attach';

@Injectable
class App {

  private _app: Application;

  constructor(
    @Inject(Settings) private _settings: Settings, 
    @Inject(Logger) private _logger: Logger, 
    @Inject('controllers') private _controllers: Function[],
    @Inject('middlewares') private _middlewares: Function[]
  ) {
    this._app = express();

    this._app.use(cors({
      credentials: true,
      allowedHeaders: [
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
      ]
    }));

    this._app.use(bodyParser.json());
    this._app.use(bodyParser.urlencoded({extended: true}));
    this._app.use(helmet());

    this._middlewares.forEach((middleware: any) => this._app.use(middleware));

    const healthcheckHandler: any = (req: Request, res: Response) => {
      res.json({ message: 'I am alive' });
    };

    this._app.get('/healthcheck', healthcheckHandler);

    attach(this._app, this._controllers);

    const errorHandler: any = (err: any, req: Request, res: Response, next: Function) => {
      if (err instanceof (Validator.ValidatorErrors as any)) {
        res.status(400).json(err);
      } else if (err instanceof PostError) {
        res.status(400).json({ message: err.message });
      } else if (err instanceof AuthError) {
        res.status(401).json({ message: err.message });
      } else if (err instanceof NotFoundError) {
        res.status(404).json({ message: err.message });
      } else {
        this._logger.error(err.message);
        
        res.status(500).json({ message: err.message });
      }
    }

    this._app.use(errorHandler);
  }

  getApp(): Application {
    return this._app;
  }

  run(): Promise<void> {
    return new Promise((resolve: Function, reject: Function) => {
      const name: string = this._settings.get('name');
      const port: number = this._settings.get('port');
      const cb: any = (err: Error): void => {
        if (err) {
          console.error(err);

          this._logger.fatal(err.message);

          reject();

          process.exit(1);
        }
      
        this._logger.info(`${name} server listening on ${port} port. Open link in browser http://localhost:3000`);

        resolve();
      };

      this._app.listen({ port }, cb);
    });
  }

}

export {
  App
};

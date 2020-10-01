import { Application, Request, Response, Router } from 'express';
import { Container } from 'ontime-di';
import { IMetadata, getMetadata } from './decorators/getMetadata';
import { args } from './common/args';
import { keys } from './common/keys';
import { IParam, IAuth } from './common/interfaces';
import { Template } from './common/Template';
import { DataSchema } from './common/DataSchema';
import { AuthError } from './errors/Auth';

function getParams(method: string, metadata: IMetadata, req: Request, res: Response): any[] {
  const params: any[] = [];

  if (metadata.params.has(method)) {
    const paramsMethod: IParam[] | undefined = metadata.params.get(method);

    if (paramsMethod) {
      paramsMethod.forEach((p: IParam) => {
        switch (p.type) {
          case args.PARAM:
            params.push(req.params[p.name]);
            break;
          case args.BODY:
            if (p.name instanceof DataSchema) {
              params.push(p.name.t(req.body || {}));
            } else {
              throw new Error('@Body must receive DataSchema instance');
            }
            break;
          case args.QUERY:
            if (p.name instanceof DataSchema) {
              params.push(p.name.t(req.query || {}));
            } else {
              throw new Error('@Query must receive DataSchema instance');
            }
            break;
          case args.REQUEST:
            params.push(req);
            break;
          case args.RESPONSE:
            params.push(res);
            break;
        }
      });
    }
  }

  return params;
}

function attach(app: Application, controllers: any[]) {
  controllers.forEach((Controller: any): void => {
    let controller: any;

    try {
      controller = Container.get(Controller);
    } catch (err) {
      controller = new Controller();
    }

    const metadata: IMetadata = getMetadata(controller);
    const router: Router = Router();

    metadata.routes.forEach((data: any): void => {
      const cb: any = async (req: Request, res: Response, next: Function): Promise<void> => {
        const auth: IAuth | undefined = metadata.auth.get(data.method);

        if (auth) {
          if (auth.key === keys.GUEST) {
            if ((req as any)[auth.name]) {
              next(new AuthError('You are authorized'));
              return;
            }
          } else if (auth.key === keys.AUTH) {
            if (!(req as any)[auth.name]) {
              next(new AuthError('You are not authorized'));
              return;
            }
          }
        }

        const params: any[] = getParams(data.method, metadata, req, res);

        let response: any;

        try {
          response = await controller[data.method](...params);
          
          if (response instanceof Template) {
            res.send(response.toString());
          } else {
            res.json(response);
          }

          next();
        } catch (err) {
          next(err);
        }
      };

      (<any>router)[data.type](data.path, cb);
    });

    if (metadata.path) {
      app.use(metadata.path, router);
    } else {
      app.use(router);
    }
  });
}

export {
  attach
};

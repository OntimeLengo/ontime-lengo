import { routes } from './routes';
import { args } from './args';
import { keys } from './keys';

interface IRoutes {
  path: string;
  method: string;
  type: routes;
}

interface IParam {
  idx: number;
  name: string | any;
  type: args;
}

interface IAuth {
  method: string;
  key: keys;
  name: string;
}

interface IMetadata {
  path: string;
  routes: Map<string, IRoutes>;
  params: Map<string, IParam[]>;
  auth: Map<string, IAuth>;
}

export {
  IRoutes,
  IParam,
  IAuth,
  IMetadata
};

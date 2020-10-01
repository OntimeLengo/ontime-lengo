import { IMetadata, getMetadata } from './getMetadata';
import { routes } from '../common/routes';

function RouteFactory(type: routes): Function {
  return (path: string): Function => {
    return (target: any, method: string, descriptor: PropertyDescriptor): PropertyDescriptor => {
      const metadata: IMetadata = getMetadata(target);

      metadata.routes.set(type + ' ' + path, { method, type, path });
  
      return descriptor;
    };
  };
}

const Get: Function = RouteFactory(routes.GET);
const Post: Function = RouteFactory(routes.POST);
const Put: Function = RouteFactory(routes.PUT);
const Delete: Function = RouteFactory(routes.DELETE);

export {
  Get,
  Post,
  Put,
  Delete
};

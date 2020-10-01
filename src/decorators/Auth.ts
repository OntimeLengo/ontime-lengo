import { IMetadata, getMetadata } from './getMetadata';
import { keys } from '../common/keys';

function Auth(name: string = 'user') {
  return (target: any, method: string, descriptor: PropertyDescriptor): PropertyDescriptor => {
    const metadata: IMetadata = getMetadata(target);

    metadata.auth.set(method, { method, name, key: keys.AUTH });
    
    return descriptor;
  }
}

export {
  Auth
};

import { IMetadata, getMetadata } from './getMetadata';
import { keys } from '../common/keys';

function Guest(name: string = 'user') {
  return (target: any, method: string, descriptor: PropertyDescriptor): PropertyDescriptor => {
    const metadata: IMetadata = getMetadata(target);

    metadata.auth.set(method, { method, name, key: keys.GUEST });
    
    return descriptor;
  }
}

export {
  Guest
};

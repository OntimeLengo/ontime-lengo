import { IMetadata, getMetadata } from './getMetadata';

function Controller(path: string = '') {
  return (target: any): any => {
    const metadata: IMetadata = getMetadata(target);

    metadata.path = path;

    return target;
  };
}

export {
  Controller
};
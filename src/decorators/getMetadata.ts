import { IMetadata } from '../common/interfaces'

function getMetadata(target: any): IMetadata {
  let constr: any;

  if (typeof target === 'function') {
    constr = target;
  } else if (typeof target === 'object' && target.constructor) {
    constr = target.constructor;
  } else {
    constr = target;
  }

  if (!constr.__metadata__) {
    const metadata: IMetadata = {
      path: '',
      routes: new Map(),
      params: new Map(),
      auth: new Map()
    };

    constr.__metadata__ = metadata;
  }

  return constr.__metadata__;
}

export {
  IMetadata,
  getMetadata
};

import { IMetadata, IParam } from '../common/interfaces';
import { getMetadata } from './getMetadata';
import { args } from '../common/args';

function paramFactory(type: args) {
  return function (name: any = ''): Function {
    return (target: any, method: string, idx: number): number => {
      const metadata: IMetadata = getMetadata(target);
  
      let data: IParam[] = [];

      if (metadata.params.has(method)) {
        data = metadata.params.get(method) || [];

        data.push({ idx, name, type });
      } else {
        data = [{ idx, name, type }];
      }

      data = data.sort((a: IParam, b: IParam): number => ((a.idx < b.idx) ? -1 : 1));
  
      metadata.params.set(method, data);
      
      return idx;
    };
  };
}

const Param: Function = paramFactory(args.PARAM);
const Body: Function = paramFactory(args.BODY);
const Query: Function = paramFactory(args.QUERY);
const Req: Function = paramFactory(args.REQUEST);
const Res: Function = paramFactory(args.RESPONSE);

export {
  Param,
  Body,
  Query,
  Req,
  Res
};

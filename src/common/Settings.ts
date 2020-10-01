import { Injectable, Inject } from 'ontime-di';

@Injectable
class Settings {

  constructor(@Inject('settings') private _options: any) {}

  get(name: string): any {
    if (name.includes('.')) {
      const keys = name.split('.');

      let val;

      for (let i = 0; keys[i]; i++) {
        if (!val) {
          val = this._options[keys[i]];
        } else {
          val = val[keys[i]];
        }
      }

      return val;
    } else {
      return this._options[name];
    }
  }

}

export {
  Settings
};

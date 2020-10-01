class DataSchema {

  private _data: any;

  constructor(data: any) {
    this._data = data;
  }

  t<T>(data: any): T {
    const newData: any = {};

    Object.keys(data).forEach((k: string): void => {
      if (!this._data[k]) {
        return;
      }

      if (this._data[k] === Array) {
        newData[k] = Array.isArray(data[k]) ? data[k] : [data[k]];
      } else if (this._data[k] === Object) {
        newData[k] = (typeof data[k] === 'object') ? data[k] : {};
      } else if (this._data[k] === Boolean) {
        let val: boolean;

        if (data[k] === 'false') {
          val = false;
        } else if (data[k] === 'true') {
          val = true;
        } else {
          val = Boolean(data[k]);
        }

        newData[k] = val;
      } else {
        newData[k] = this._data[k](data[k]);
      }
    });

    return newData as T;
  }

}

export {
  DataSchema
};

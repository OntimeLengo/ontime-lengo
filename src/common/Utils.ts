abstract class Utils {

  static format(s: string, c: any = {}, formatter: RegExp = /{{\s?(\w+)\s?}}/g): string {
    return s.replace(formatter, (m: any, p: any) => (c[p] || ''));
  }

  static splitCamelCase(s: string): string {
    return s.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
  }

  static capitalize(s: string) {
    return s[0].toUpperCase() + s.slice(1).toLowerCase();
  }

  static splitCapitalize(s: string, spliter = '-'): string {
    const data: string[] = s.split(spliter);

    for (let i = 0; data[i]; i++) {
      data[i] = this.capitalize(data[i]);
    }

    return data.join('');
  }

  static uniqueId(): string {
    return Math.random().toString(32).substr(2, 12);
  }

  static debounce(cb: Function, delay: number = 300): Function {
    let timerId: any;

    return (...args: any[]) => {
      if (timerId) {
        clearTimeout(timerId as number);
      }

      timerId = setTimeout(() => {
        cb(...args);

        timerId = undefined;
      }, delay);
    };
  }

  static deepCopy(data: any): any {
    if (Array.isArray(data)) {
      return data.map((item) => Utils.deepCopy(item));
    } else if (typeof data === 'object' && data) {
      const newData = {};

      return Object.keys(data).reduce((acc: any, k: string): any => {
        acc[k] = Utils.deepCopy(data[k]);

        return acc;
      }, newData);
    } else {
      return data;
    }
  }

  static pick<T>(data: T, allowKeys: string[]) {
    const pickedData: any = {};

    Object.keys(data).reduce((acc: any, k: string): any => {
      if (allowKeys.includes(k)) {
        const t: any = data;

        acc[k] = t[k];
      }
      return acc;
    }, pickedData);

    return pickedData;
  }

}

export { 
  Utils
};

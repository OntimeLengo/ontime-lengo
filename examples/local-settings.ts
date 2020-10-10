interface ISettings {
  logLevel: string;
  name: string;
  port: number;
}

const localSettings: ISettings = {
  logLevel: process.env.LOG_LEVEL || 'debug',
  name: 'Ontime-Lengo examples',
  port: 3000
};

export {
  localSettings
};

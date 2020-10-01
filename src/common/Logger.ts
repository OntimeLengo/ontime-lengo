import { Injectable, Inject } from 'ontime-di';
import { configure, getLogger } from 'log4js';
import { Settings } from './Settings';

@Injectable
class Logger {

  private _logger: any;

  constructor(@Inject(Settings) private _settings: Settings) {
    configure({
      appenders: {
        app: {
          type: 'file', 
          filename: 'app.log'
        },
        console: {
          type: 'console'
        }
      },
      categories: {
        default: {
          appenders: ['console', 'app'], 
          level: this._settings.get('logLevel')
        }
      }
    });

    this._logger = getLogger('app');
  }

  trace(log: string): void {
    this._logger.trace(log);
  }

  debug(log: string): void {
    this._logger.debug(log);
  }

  info(log: string): void {
    this._logger.info(log);
  }

  warn(log: string): void {
    this._logger.warn(log);
  }

  error(log: string): void {
    this._logger.error(log);
  }

  fatal(log: string): void {
    this._logger.fatal(log);
  }

}

export {
  Logger
};
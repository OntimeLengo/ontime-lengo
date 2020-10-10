import { Container } from 'ontime-di';
import { App } from '../src/index';
import { UserController } from './modules/user/User.controller';
import { localSettings } from './local-settings';

function main() {
  Container.register('settings', localSettings);
  Container.register('middlewares', []);
  Container.register('controllers', [ UserController ]);
    
  const app: App = Container.get<App>(App);
  
  app.run();
}

main();

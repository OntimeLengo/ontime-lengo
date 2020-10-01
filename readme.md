<h1>Ontime Lengo</h1>

<strong>Attention! Documentation is in progress and frameworkis not published in NPM yet</strong>

Ontime Lengo is a simple backend framework that helps you to build any serverside application. If you like OOP programming and MVC way that this framework is for you.

You are able to create controllers follow OOP.

PS ExpressJS is used underhood.

Examples.
```typescript
// UsersController.ts
import { Injectable } from 'ontime-di';
import { Controller, Get, Param } from 'ontime-lengo';

@Injectable
@Controller('/users')
class Users {

  @Get('/get/:id')
  async get(@Param('id') id: string): Promise<YOUR-USER-INTERFACE> {
    // Your logic here
    // Method should return User object
    return { ... };
  }

}

export {
  Users
};
```

```typescript
// server.ts

import { Container } from 'ontime-di';
import { App } from 'ontime-lengo';
import { UsersController } from './controllers/UsersController';

function main() {
  Container.register('controllers', [ Users ]);
    
  const app: App = Container.get<App>(App);
  
  app.run();
}

main();
```
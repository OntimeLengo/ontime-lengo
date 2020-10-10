import { Injectable } from 'ontime-di';
import { Controller, Get, Post, Put, Delete, Param, Body } from '../../../src/index';
import { IUser } from './User.interfaces';
import { CreateUserDataSchema } from './CreateUser.dataschema';
import { UpdateUserDataSchema } from './UpdateUser.dataschema';

@Injectable
@Controller('/user')
class UserController {

  @Get('/')
  async list(): Promise<IUser[]> {
    return Array(10).fill(void(0)).map((item: void, idx: number): IUser => {
      const id: string = (idx + 1).toString();

      return {
        id,
        name: 'Test ' + id,
        email: 'test' + id + '@test.com',
        language: 'en',
        active: true
      }
    });
  }

  @Get('/:id')
  async get(@Param('id') id: string): Promise<IUser> {
    return { 
      id,
      name: 'Test ' + id,
      email: 'test' + id + '@test.com',
      language: 'en',
      active: true
    };
  }

  @Post('/')
  async create(@Body(CreateUserDataSchema) data: IUser): Promise<IUser> {
    data.id = '1000';

    return data;
  }

  @Put('/:id')
  async update(@Param('id') id: string, @Body(UpdateUserDataSchema) data: IUser): Promise<IUser> {
    data.id = id;
    
    return data;
  }

  @Delete('/:id')
  async remove(@Param('id') id: string): Promise<IUser> {
    return await this.get(id);
  }

}

export {
  UserController
};
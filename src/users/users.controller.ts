import {   Get, Post, Body, Param, Controller, Put, Delete, Res, HttpStatus } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import { Response } from 'express';

import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { User } from '../models/user.model';

@Controller('users')
export class UsersController {

    constructor(private userService: UsersService){

    }

    @Get('/all')
    async findAll(): Promise<User[]> {
      return this.userService.findAll();
    }

    @Get('/one:id')
    async findOne(@Param() params): Promise<User> {
      return this.userService.findOne(params.id);
    }
  
    @Post()
    async create(@Body(new ValidationPipe({ transform: true })) exam: CreateUserDto ) {
      return this.userService.create(exam);
    }
  
    @Put(':id')
    async update(
      @Param('id') id: number,
      @Body(new ValidationPipe({ transform: true })) user: UpdateUserDto,
      @Res() res: Response,
    ) {
      const result = await this.userService.update(id, user);
      if (result) {
        return res.status(HttpStatus.CREATED).send(result);
      }
      return res
        .status(HttpStatus.BAD_REQUEST)
        .send('User not found or inactive');
    }
  
    @Delete(':id')
    async delete(@Param('id') id: number, @Res() res: Response) {
      const result = await this.userService.delete(id);
      if (result) {
        return res.status(HttpStatus.OK).send(result);
      }
      return res
        .status(HttpStatus.BAD_REQUEST)
        .send('user not found or inactive');
    }

}

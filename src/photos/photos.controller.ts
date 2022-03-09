import {   Get, Post, Body, Param, Controller, Put, Delete, Res, HttpStatus } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import { Response } from 'express';

import { PhotosService } from './photos.service';
import { CreatePhotoDto, UpdatePhotoDto } from './photo.dto';
import { Photo } from '../models/photo.model';

@Controller('photos')
export class PhotosController {

    constructor(private photosService: PhotosService){

    }

    @Get('/all')
    async findAll(): Promise<Photo[]> {
      return this.photosService.findAll();
    }

    @Get('/one:id')
    async findOne(@Param() params): Promise<Photo> {
      return this.photosService.findOne(params.id);
    }
  
    @Post()
    async create(@Body(new ValidationPipe({ transform: true })) exam: CreatePhotoDto ) {
      return this.photosService.create(exam);
    }
  
    @Put(':id')
    async update(
      @Param('id') id: number,
      @Body(new ValidationPipe({ transform: true })) user: UpdatePhotoDto,
      @Res() res: Response,
    ) {
      const result = await this.photosService.update(id, user);
      if (result) {
        return res.status(HttpStatus.CREATED).send(result);
      }
      return res
        .status(HttpStatus.BAD_REQUEST)
        .send('User not found or inactive');
    }
  
    @Delete(':id')
    async delete(@Param('id') id: number, @Res() res: Response) {
      const result = await this.photosService.delete(id);
      if (result) {
        return res.status(HttpStatus.OK).send(result);
      }
      return res
        .status(HttpStatus.BAD_REQUEST)
        .send('user not found or inactive');
    }
}

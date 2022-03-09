import { Injectable,Inject } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import { Photo } from '../models/photo.model';
import { User } from '../models/user.model';
import { CreatePhotoDto, UpdatePhotoDto } from './photo.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class PhotosService {
  constructor(
    @Inject('PHOTOS_REPOSITORY')
    private photoRepository: typeof Photo,
    private readonly usersService: UsersService,
    //private sequelize: Sequelize
  ) {}

  async findAll(): Promise<Photo[]> {
    return this.photoRepository.findAll();
  }

  findOne(id: string): Promise<Photo> {
    return this.photoRepository.findOne({
      where: {
        id,
      },
    });
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);
    await user.destroy();
  }

  async create(createPhotoDto: CreatePhotoDto): Promise<Photo> {
    const photo = new Photo();
    photo.name = createPhotoDto.name;
    photo.description = createPhotoDto.description;
    photo.filename = createPhotoDto.filename;
    photo.views = createPhotoDto.views;
    photo.isPublished = createPhotoDto.isPublished
    photo.user = await this.usersService.findOne(createPhotoDto.userId.toString());
    photo.userId = createPhotoDto.userId;
    return await photo.save();
  }

  async update(id: number, updatePhotoDto: UpdatePhotoDto): Promise<Photo | boolean> {
    const obj = await this.photoRepository.findOne<Photo>({
      where: { id, isPublished : true },
    });
    if (obj === null || Object.keys(obj).length === 0) {
      return false;
    }

    obj.name = updatePhotoDto.name;
    obj.description = updatePhotoDto.description;
    obj.filename = updatePhotoDto.filename;
    obj.views = updatePhotoDto.views;
    obj.isPublished = updatePhotoDto.isPublished
    return await obj.save();
  }

  async delete(id: number): Promise<Photo | boolean> {
    const obj = await this.photoRepository.findOne<Photo>({
      where: { id, isPublished: true },
    });
    if (obj === null || Object.keys(obj).length === 0) {
      return false;
    }
    obj.isPublished = false;
    return await obj.save();
  }

}
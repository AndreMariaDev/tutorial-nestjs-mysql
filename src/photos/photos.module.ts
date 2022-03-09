import { Module, Controller } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { PhotosController } from './photos.controller';
import { PhotosService } from './photos.service';
import { photosProviders } from './photos.providers'

import { UsersService } from '../users/users.service';
import { usersProviders } from '../users/user.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [PhotosController],
  providers:[PhotosService, ...photosProviders,UsersService, ...usersProviders]
})
export class PhotosModule {}
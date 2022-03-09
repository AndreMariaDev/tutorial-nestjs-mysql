import { Module, Controller } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { usersProviders } from './user.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers:[UsersService, ...usersProviders]
})
export class UsersModule {}
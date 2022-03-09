import { Sequelize } from 'sequelize-typescript';

import { User } from '../models/user.model';
import { Photo } from '../models/photo.model';
import { dbConfig } from './db.config';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize(
        dbConfig.DB || 'tutorial_db', 
        dbConfig.USER || 'root', 
        dbConfig.PASSWORD || '123456', 
        {
          host: dbConfig.HOST || 'localhost',
          dialect: "mysql",
          port: Number(dbConfig.port) || 3307,
          pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle
          }
        }
      );

      sequelize.addModels([User]);
      sequelize.addModels([Photo]);
      await sequelize.sync();
      return sequelize;
    },
  },
];

import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSource, dataSourceOptions } from 'db/data-source';
import { UsersModule } from './users/users.module';
import { MiddlewareBuilder } from '@nestjs/core';
import { CurrentUserMiddleware } from './utilty/middlewares/current-user.middleware';
import { CategoryModule } from './category/category.module';

@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions), UsersModule, CategoryModule],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CurrentUserMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}

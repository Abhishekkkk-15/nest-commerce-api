import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSource, dataSourceOptions } from 'db/data-source';
import { UsersModule } from './users/users.module';
import { MiddlewareBuilder } from '@nestjs/core';
import { CurrentUserMiddleware } from './utilty/middlewares/current-user.middleware';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { ReviewsModule } from './reviews/reviews.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    UsersModule,
    CategoryModule,
    ProductModule,
    ReviewsModule,
    OrdersModule,
  ],
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

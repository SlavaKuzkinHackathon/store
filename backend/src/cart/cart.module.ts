/* import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';

@Module({
  controllers: [CartController],
  providers: [CartService]
})
export class CartModule {}
 */

import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { Cart } from './cart.model';
import { UsersModule } from '../users/users.module';
import { DivansModule } from '../divans/divans.module';

@Module({
  imports: [
    SequelizeModule.forFeature([Cart]),
    UsersModule,
    DivansModule,
  ],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
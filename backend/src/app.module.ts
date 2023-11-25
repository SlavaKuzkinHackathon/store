import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { SequelizeConfigService } from './config/sequelizeConfig.service';
import { databaseConfig } from './config/configuration';
import { AuthModule } from './auth/auth.module';
import { DivansModule } from './divans/divans.module';
import { CartModule } from './cart/cart.module';
import { PaymentModule } from './payment/payment.module';


@Module({
  imports: [
    SequelizeModule.forRootAsync({
      imports:[ConfigModule],
      useClass: SequelizeConfigService
}),
ConfigModule.forRoot({
  load: [databaseConfig]
}),
    UsersModule,
    AuthModule,
    DivansModule,
    CartModule,
    PaymentModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { DivansController } from './divans.controller';
import { DivansService } from './divans.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Divans } from './divans.model';

@Module({
  imports: [SequelizeModule.forFeature([Divans])],
  controllers: [DivansController],
  providers: [DivansService],
  exports: [DivansService]
})
export class DivansModule {}

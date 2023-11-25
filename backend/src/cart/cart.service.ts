import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { DivansService } from 'src/divans/divans.service';
import { UsersService } from 'src/users/users.service';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { Cart } from './cart.model';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart)
    private cartModel: typeof Cart,
    private readonly usersService: UsersService,
    private readonly divansService: DivansService,
  ) {}

  async findAll(userId: number | string): Promise<Cart[]> {
    return this.cartModel.findAll({ where: { userId } });
  }

  async add(addToCartDto: AddToCartDto) {
    const cart = new Cart();
    const user = await this.usersService.findOne({
      where: { username: addToCartDto.username },
    });
    const divans = await this.divansService.findOne(addToCartDto.divansId);

    cart.userId = user.id;
    cart.divansId = divans.id;
    cart.divans_manufacturer = divans.divans_manufacturer;
    cart.price = divans.price;
    cart.in_stock = divans.in_stock;
    cart.image = JSON.parse(divans.images)[0];
    cart.name = divans.name;
    cart.total_price = divans.price;

    return cart.save();
  }

  async updateCount(
    count: number,
    divansId: number | string,
  ): Promise<{ count: number }> {
    await this.cartModel.update({ count }, { where: { divansId } });

    const divans = await this.cartModel.findOne({ where: { divansId } });

    return { count: divans.count };
  }

  async updateTotalPrice(
    total_price: number,
    divansId: number | string,
  ): Promise<{ total_price: number }> {
    await this.cartModel.update({ total_price }, { where: { divansId } });

    const divans = await this.cartModel.findOne({ where: { divansId } });

    return { total_price: divans.total_price };
  }

  async remove(divansId: number | string): Promise<void> {
    const divans = await this.cartModel.findOne({ where: { divansId } });

    await divans.destroy();
  }

  async removeAll(userId: number | string): Promise<void> {
    await this.cartModel.destroy({ where: { userId } });
  }
}

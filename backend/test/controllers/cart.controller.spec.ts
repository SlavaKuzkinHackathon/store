import { INestApplication } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import * as request from 'supertest';
import * as session from 'express-session';
import * as passport from 'passport';
import { SequelizeModule } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { databaseConfig } from 'src/config/configuration';
import { SequelizeConfigService } from 'src/config/sequelizeConfig.service';
import { User } from 'src/users/users.model';
import { AuthModule } from 'src/auth/auth.module';
import { DivansModule } from 'src/divans/divans.module';
import { DivansService } from '../../src/divans/divans.service';
import { UsersService } from '../../src/users/users.service';
import { Cart } from '../../src/cart/cart.model';
import { CartModule } from '../../src/cart/cart.module';
import { CartService } from '../../src/cart/cart.service';

const mockedUser = {
  username: 'Jhon',
  email: 'jhon@gmail.com',
  password: 'jhon123',
};

describe('Shopping Cart Service', () => {
  let app: INestApplication;
  let divansService: DivansService;
  let usersService: UsersService;
  let cartService: CartService;

  beforeEach(async () => {
    const testModule: TestingModule = await Test.createTestingModule({
      imports: [
        SequelizeModule.forRootAsync({
          imports: [ConfigModule],
          useClass: SequelizeConfigService,
        }),
        ConfigModule.forRoot({
          load: [databaseConfig],
        }),
        CartModule,
        DivansModule,
      ],
    }).compile();

    divansService = testModule.get<DivansService>(DivansService);
    usersService = testModule.get<UsersService>(UsersService);
    cartService =
      testModule.get<CartService>(CartService);

    app = testModule.createNestApplication();

    await app.init();
  });

  beforeEach(async () => {
    const user = new User();

    const hashedPassword = await bcrypt.hash(mockedUser.password, 10);

    user.username = mockedUser.username;
    user.password = hashedPassword;
    user.email = mockedUser.email;

    return user.save();
  });

  beforeEach(async () => {
    const cart = new Cart();
    const user = await usersService.findOne({
      where: { username: mockedUser.username },
    });
    const divans = await divansService.findOne(1);

    cart.userId = user.id;
    cart.divansId = divans.id;
    cart.divans_manufacturer = divans.divans_manufacturer;
    cart.price = divans.price;
    cart.in_stock = divans.in_stock;
    cart.image = JSON.parse(divans.images)[0];
    cart.name =divans.name;
    cart.total_price = divans.price;

    return cart.save();
  });

  afterEach(async () => {
    await User.destroy({ where: { username: mockedUser.username } });
    await Cart.destroy({ where: { divansId: 1 } });
  });

  it('should return all cart items', async () => {
    const user = await usersService.findOne({
      where: { username: mockedUser.username },
    });

    const cart = await cartService.findAll(user.id);

    cart.forEach((item) =>
      expect(item.dataValues).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          userId: user.id,
          divansId: expect.any(Number),
          divans_manufacturer: expect.any(String),
          price: expect.any(Number),
          name: expect.any(String),
          image: expect.any(String),
          count: expect.any(Number),
          total_price: expect.any(Number),
          in_stock: expect.any(Number),
          createdAt: expect.any(Date),
          updatedAt: expect.any(Date),
        }),
      ),
    );
  });

  it('should add cart items', async () => {
    await cartService.add({
      username: mockedUser.username,
      divansId: 3,
    });

    const user = await usersService.findOne({
      where: { username: mockedUser.username },
    });

    const cart = await cartService.findAll(user.id);

    expect(cart.find((item) => item.divansId === 3)).toEqual(
      expect.objectContaining({
        id: expect.any(Number),
        userId: user.id,
        divansId: 3,
        divans_manufacturer: expect.any(String),
        price: expect.any(Number),
        name: expect.any(String),
        image: expect.any(String),
        count: expect.any(Number),
        total_price: expect.any(Number),
        in_stock: expect.any(Number),
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      }),
    );
  });

  it('should return updated count', async () => {
    const result = await cartService.updateCount(2, 1);

    expect(result).toEqual({ count: 2 });
  });

  it('should return updated total price', async () => {
    const divans = await divansService.findOne(1);
    const result = await cartService.updateTotalPrice(
      divans.price * 3,
      1,
    );

    expect(result).toEqual({ total_price: divans.price * 3 });
  });

  it('should delete cart item', async () => {
    await cartService.remove(1);

    const user = await usersService.findOne({
      where: { username: mockedUser.username },
    });

    const cart = await cartService.findAll(user.id);

    expect(cart.find((item) => item.divansId === 1)).toBeUndefined();
  });

  it('should delete all cart items', async () => {
    const user = await usersService.findOne({
      where: { username: mockedUser.username },
    });

    await cartService.removeAll(user.id);

    const cart = await cartService.findAll(user.id);

    expect(cart).toStrictEqual([]);
  });
});
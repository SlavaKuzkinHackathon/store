import {
    Controller,
    Get,
    Param,
    UseGuards,
    Post,
    Body,
    Patch,
    Delete,
  } from '@nestjs/common';
  import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
  import { AddToCartDto } from './dto/add-to-cart.dto';
  import { CartService } from './cart.service';
  import { ApiOkResponse, ApiBody } from '@nestjs/swagger';
  import {
    AddToCardResponse,
    GetAllResponse,
    TotalPriceRequest,
    TotalPriceResponse,
    UpdateCountRequest,
    UpdateCountResponse,
  } from './types';
  
  @Controller('cart')
  export class CartController {
    constructor(private readonly cartService: CartService) {}
  
    @ApiOkResponse({ type: [GetAllResponse] })
    @UseGuards(AuthenticatedGuard)
    @Get(':id')
    getAll(@Param('id') userId: string) {
      return this.cartService.findAll(userId);
    }
  
    @ApiOkResponse({ type: AddToCardResponse })
    @UseGuards(AuthenticatedGuard)
    @Post('/add')
    addToCar(@Body() addToCartDto: AddToCartDto) {
      return this.cartService.add(addToCartDto);
    }
  
    @ApiOkResponse({ type: UpdateCountResponse })
    @ApiBody({ type: UpdateCountRequest })
    @UseGuards(AuthenticatedGuard)
    @Patch('/count/:id')
    updateCount(
      @Body() { count }: { count: number },
      @Param('id') divansId: string,
    ) {
      return this.cartService.updateCount(count, divansId);
    }
  
    @ApiOkResponse({ type: TotalPriceResponse })
    @ApiBody({ type: TotalPriceRequest })
    @UseGuards(AuthenticatedGuard)
    @Patch('/total-price/:id')
    updateTotalPrice(
      @Body() { total_price }: { total_price: number },
      @Param('id') divansId: string,
    ) {
      return this.cartService.updateTotalPrice(total_price, divansId);
    }
  
    @UseGuards(AuthenticatedGuard)
    @Delete('/one/:id')
    removeOne(@Param('id') divansId: string) {
      return this.cartService.remove(divansId);
    }
  
    @UseGuards(AuthenticatedGuard)
    @Delete('/all/:id')
    removeAll(@Param('id') userId: string) {
      return this.cartService.removeAll(userId);
    }
  }
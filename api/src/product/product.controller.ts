import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Roles } from 'src/role/role-auth.decorators';
import { RolesGuard } from 'src/role/role.guard';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './models/product.model';
import { ProductService } from './product.service';

@ApiTags('Товары')
@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @ApiOperation({ summary: 'Получение одного товара' })
  @ApiResponse({
    status: 200,
    type: Product,
    description: 'Возвращаются данные товара',
  })
  @ApiResponse({
    status: 404,
    description: 'Товара не существует',
  })
  @Get(':id')
  async getOne(@Param('id') id: string): Promise<Product> {
    return await this.productService.getOneProduct(+id);
  }

  @ApiOperation({ summary: 'Добавление товара' })
  @ApiResponse({
    status: 200,
    description: 'Товар успешно создан',
  })
  @ApiResponse({
    status: 400,
    description: 'Товар уже существует',
  })
  @Post()
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @UseInterceptors(FileInterceptor('images'))
  async create(
    @Body() createProductDto: CreateProductDto,
    @UploadedFiles() images: Express.Multer.File[],
  ): Promise<string> {
    return await this.productService.createProduct(createProductDto, images);
  }


  @ApiOperation({ summary: 'Получение всех каталогов' })
  @ApiResponse({
    status: 200,
    type: [Product],
    description: 'Возвращаются все каталоги',
  })
  @Get()
  async getAllProducts(): Promise<Product[]> {
    return await this.productService.getAllProducts();
  }



  @ApiOperation({ summary: 'Получение новинок и популярных товаров' })
  @ApiResponse({
    status: 200,
    description: 'Возвращаются новинки и популярные товары',
  })
  @Get('new')
  async getNoveltyAndPopular(): Promise<{
    novelties: Product[];
    populars: Product[];
  }> {
    return await this.productService.getNoveltyAndPopular();
  } 

  @ApiOperation({ summary: 'Изменение товара' }) 
  @ApiResponse({
    status: 200,
    description: 'Товар изменен',
  })
  @ApiResponse({
    status: 404,
    description: 'Запрашиваемого товара не существует',
  })
  @Put(':id')
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  @UseInterceptors(FileInterceptor('image'))
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
    @UploadedFile() images: Express.Multer.File,
  ): Promise<string> {
    return await this.productService.updateProduct(
      +id,
      updateProductDto,
      images,
    );
  }

  @ApiOperation({ summary: 'Удаление товара' })
  @ApiResponse({
    status: 200,
    description: 'Товар удален',
  })
  @ApiResponse({
    status: 404,
    description: 'Товара не существует',
  })
  @Delete(':id')
  @Roles('ADMIN')
  @UseGuards(RolesGuard)
  async remove(@Param('id') id: string): Promise<string> {
    return await this.productService.removeProduct(+id);
  }
}



import { Body, Controller, Post } from '@nestjs/common';
import { Get } from '@nestjs/common';
import { Param, Query, UseGuards } from '@nestjs/common';
import { DivansService } from './divans.service';
import { AuthenticatedGuard } from '../auth/authenticated.guard';
import { ApiOkResponse, ApiBody } from '@nestjs/swagger';
import {
  PaginateAndFilterResponse,
  FindOneResponse,
  GetBestsellersResponse,
  GetNewResponse,
  SearchResponse,
  SearchRequest,
  GetByNameResponse,
  GetByNameRequest,
} from './types';

@Controller('divans')
export class DivansController {
  constructor(private readonly divansService: DivansService) {}

  @ApiOkResponse({ type: PaginateAndFilterResponse })
  //@UseGuards(AuthenticatedGuard)
  @Get()
  paginateAndFilter(@Query() query) {
    return this.divansService.paginateAndFilter(query);
  }

  @ApiOkResponse({ type: FindOneResponse })
  //@UseGuards(AuthenticatedGuard)
  @Get('find/:id')
  getOne(@Param('id') id: string) {
    return this.divansService.findOne(id);
  }

  @ApiOkResponse({ type: GetBestsellersResponse })
  //@UseGuards(AuthenticatedGuard)
  @Get('bestsellers')
  getBestseller() {
    return this.divansService.bestsellers();
  }

  @ApiOkResponse({ type: GetNewResponse })
  //@UseGuards(AuthenticatedGuard)
  @Get('new')
  getNew() {
    return this.divansService.new();
  }

  @ApiOkResponse({ type: SearchResponse })
  @ApiBody({ type: SearchRequest })
  //@UseGuards(AuthenticatedGuard)
  @Post('search')
  search(@Body() { search }: { search: string }) {
    return this.divansService.searchByString(search);
  }

  @ApiOkResponse({ type: GetByNameResponse })
  @ApiBody({ type: GetByNameRequest })
  //@UseGuards(AuthenticatedGuard)
  @Post('name')
  getByName(@Body() { name }: { name: string }) {
    return this.divansService.findOneByName(name);
  }
}
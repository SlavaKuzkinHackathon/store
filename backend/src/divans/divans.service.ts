import { Injectable } from '@nestjs/common';
import { Divans } from './divans.model';
import { InjectModel } from '@nestjs/sequelize';
import { IDivansFilter, IDivansQuery } from './types';
import { Op } from 'sequelize';

@Injectable()
export class DivansService {
    constructor(
        @InjectModel(Divans)
        private divansModel: typeof Divans
    ) { }

    async paginateAndFilter(query: IDivansQuery): Promise<{ count: number; rows: Divans[] }> {
        const limit = +query.limit;
        const offset = +query.offset * 20;
        const filter = {} as Partial<IDivansFilter>

        if (query.priceFrom && query.priceTo) {
            filter.price = {
                [Op.between]: [+query.priceFrom, +query.priceTo]
            }
        }

        if (query.divans) {
            filter.divans_manufacturer = JSON.parse(decodeURIComponent(query.divans))
        }

        return this.divansModel.findAndCountAll({
            limit,
            offset,
            where: filter
        })
    }

    async bestsellers(): Promise<{ count: number; rows: Divans[] }> {
        return this.divansModel.findAndCountAll({
            where: { bestseller: true }
        })
    }

    async new(): Promise<{ count: number; rows: Divans[] }> {
        return this.divansModel.findAndCountAll({
            where: { new: true },
        });
    }

    async findOne(id: number | string): Promise<Divans> {
        return this.divansModel.findOne({
            where: { id },
        });
    }

    async findOneByName(name: string): Promise<Divans> {

        return this.divansModel.findOne({
            where: { name }
        })
    }

    async searchByString(
        str: string,
    ): Promise<{ count: number; rows: Divans[] }> {
        return this.divansModel.findAndCountAll({
            limit: 20,
            where: { name: { [Op.like]: `%${str}%` } },
        });
    }
}

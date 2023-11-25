import { Table, Model, Column } from 'sequelize-typescript';

@Table
export class Cart extends Model {
  @Column
  userId: number;

  @Column({ defaultValue: 0 })
  divansId: number;

  @Column
  divans_manufacturer: string;

  @Column({ defaultValue: 0 })
  price: number;

  @Column
  name: string;

  @Column
  image: string;

  @Column({ defaultValue: 0 })
  in_stock: number;

  @Column({ defaultValue: 1 })
  count: number;

  @Column({ defaultValue: 0 })
  total_price: number;
}
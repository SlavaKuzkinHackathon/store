import { Table, Model, Column } from 'sequelize-typescript';

@Table
export class Divans extends Model {
    @Column({ defaultValue: null })
    divans_manufacturer: string;
  
    @Column({ defaultValue: 0 })
    price: number;
  
    @Column({ defaultValue: null })
    vendor_code: string;
  
    @Column({ defaultValue: null })
    name: string;
  
    @Column({ defaultValue: null })
    description: string;
  
    @Column({ defaultValue: null })
    images: string;
  
    @Column({ defaultValue: 0 })
    in_stock: number;
  
    @Column({ defaultValue: false })
    bestseller: boolean;
  
    @Column({ defaultValue: false })
    new: boolean;
  
    @Column({ defaultValue: 0 })
    popularity: number;
  
}
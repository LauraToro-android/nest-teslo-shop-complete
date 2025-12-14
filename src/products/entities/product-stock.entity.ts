import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './product.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'product_stocks' }) // Se creará una nueva tabla en la DB
export class ProductStock {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({ description: 'Talla de la variante de stock (ej. S, M, XL)' })
    @Column('text')
    size: string; 

    @ApiProperty({ description: 'Cantidad disponible de esta talla' })
    @Column('int')
    quantity: number; 

    // Relación que conecta cada entrada de stock con UN producto
    @ManyToOne(
        () => Product,
        (product) => product.stockEntries, // Este es el nombre de la propiedad en Product
        { onDelete: 'CASCADE' } 
    )
    product: Product;
}
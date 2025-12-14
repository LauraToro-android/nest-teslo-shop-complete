import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsIn, IsInt, IsNumber, IsOptional, 
         IsPositive, IsString, MinLength 
} from 'class-validator';

import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';

export class ProductStockEntryDto {
    
    @ApiProperty({ description: 'Talla (ej. S, M, L)' })
    @IsString()
    size: string;

    @ApiProperty({ description: 'Cantidad disponible para esta talla' })
    @IsInt() 
    @IsPositive()
    quantity: number;
}


export class CreateProductDto {

    @ApiProperty({
        description: 'Product title (unique)',
        nullable: false,
        minLength: 1
    })
    @IsString()
    @MinLength(1)
    title: string;

    @ApiProperty()
    @IsNumber()
    @IsPositive()
    @IsOptional()
    price?: number;

    @ApiProperty()
    @IsString()
    @IsOptional()
    description?: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    slug?: string;

    //@ApiProperty()
    //@IsInt()
    //@IsPositive()
    //@IsOptional()
    //stock?: number; 

    @ApiProperty()
    @IsString({ each: true })
    @IsArray()
    @IsOptional()
    sizes?: string[]

    @ApiProperty()
    @IsIn(['men','women','kid','unisex'])
    gender: string;

    @ApiProperty()
    @IsString({ each: true })
    @IsArray()
    @IsOptional()
    tags: string[];

    @ApiProperty()
    @IsString({ each: true })
    @IsArray()
    @IsOptional()
    images?: string[];

    @ApiProperty({ description: 'Arreglo de entradas de stock por talla', type: [ProductStockEntryDto], required: false })
    @IsOptional() 
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ProductStockEntryDto) 
    stockEntries?: ProductStockEntryDto[];


}

import { Model } from 'mongoose';
import { ProductDocument } from './schemas/product.schema';
export declare class ProductsService {
    private productModel;
    constructor(productModel: Model<ProductDocument>);
    create(createProductDto: any): Promise<ProductDocument>;
    findAll(): Promise<ProductDocument[]>;
    findOne(id: string): Promise<ProductDocument>;
    update(id: string, updateProductDto: any): Promise<ProductDocument>;
    remove(id: string): Promise<any>;
}

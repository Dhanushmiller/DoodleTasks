import { ProductsService } from './products.service';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    create(createProductDto: any): Promise<{
        message: string;
        data: import("./schemas/product.schema").ProductDocument;
    }>;
    findAll(): Promise<{
        message: string;
        data: import("./schemas/product.schema").ProductDocument[];
    }>;
    findOne(id: string): Promise<{
        message: string;
        data: import("./schemas/product.schema").ProductDocument;
    }>;
    update(id: string, updateProductDto: any): Promise<{
        message: string;
        data: import("./schemas/product.schema").ProductDocument;
    }>;
    remove(id: string): Promise<{
        message: string;
        data: any;
    }>;
}

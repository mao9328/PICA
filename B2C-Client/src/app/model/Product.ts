import { Image } from './Image';

export interface Product {

    Id: number;
    Name: string;
    Code: string;
    ListPrice: number;
    Description: string;
    Images: Image[];
    IdCategory: string;
    IdProducer: string;
    IdProvider: string;
    IsActive: boolean;
}

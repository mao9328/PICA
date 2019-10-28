import { Image } from './Image';
export interface Product {
    Id: number;
    Name: string;
    Code: string;
    Price: number;
    Description: string;
    Images: Image[];
}

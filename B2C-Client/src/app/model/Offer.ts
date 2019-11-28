import { Image } from './Image';

export class Offer {
    Id: number;
    Name: string;
    BeginDate: string;
    EndDate: string;
    Description: string;
    Discount: number;
    IdProduct: number;
    IsActive: boolean;
    Image: Image;
}

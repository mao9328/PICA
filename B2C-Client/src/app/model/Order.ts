import { Item } from './Item';
import { State } from './State';
import { Address } from './Address';

export class Order {

    Id: number;
    Date: string;
    Price: number;
    Comments: string;
    Address:Address;
    Items: Item[];
    IdCustomer: number;
    State: State;
}

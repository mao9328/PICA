import { Item } from './Item';
import { State } from './State';

export class Order {

    Id: number;
    Date: string;
    Price: number;
    Comments: string;
    Items: Item[];
    IdCustomer: number;
    State: State;
}

import { Address } from './Address';
import { State } from './State';

export class Customer {
    Id: number;
    FirstName: string;
    LastName: string;
    PhoneNumber: string;
    Email: string;
    Addresses: Address[];
    State: State;
}

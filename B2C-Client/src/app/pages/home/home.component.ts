import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/Product';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  products: Product[];

  constructor() { }

  ngOnInit() {

    this.products = [
      {
        Id: 1,
        Code:'PA',
        Name: 'Producto A',
        Price: 50000,
        Description: 'producto salvaje A'
      },
      {
        Id: 2,
        Code:'PB',
        Name: 'Producto B',
        Price: 60000,
        Description: 'producto salvaje B'
      },
      {
        Id: 3,
        Code:'PC',
        Name: 'Producto C',
        Price: 70000,
        Description: 'producto salvaje C'
      },
      {
        Id: 4,
        Code:'PD',
        Name: 'Producto D',
        Price: 80000,
        Description: 'producto salvaje D'
      }
    ];
  }
}

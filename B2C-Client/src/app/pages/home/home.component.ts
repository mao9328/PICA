import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/Product';
import { BusinessService } from 'src/app/services/business.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  products: Product[];

  constructor(private business: BusinessService) { }

  ngOnInit() {

    this.business.GetProducts().subscribe((response: Product[]) => {

      this.products = response;

    });
    
  }
}

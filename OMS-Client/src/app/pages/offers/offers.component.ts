import { Component, OnInit } from '@angular/core';
import { Offer } from 'src/app/model/Offer';
import { BusinessService } from 'src/app/services/business.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss']
})
export class OffersComponent implements OnInit {

  elements = 10;
  page = 1;
  total = 1;

  offers: Offer[];

  constructor(
    private business: BusinessService,
    private spinner: SpinnerService,
    private toast: ToastrService,
    private builder: FormBuilder) { }

  ngOnInit() {

    this.spinner.show();

    this.business.GetActiveOffers(this.elements, this.page).subscribe((response) => {

      this.spinner.hide();

      if (!response.Error) {

        this.offers = response.Result;
      }
    }, () => {

      this.spinner.hide();

      this.toast.error('No ha sido posible consultar los productos', 'Error!');

    });

  }

  pageChanged(pagina) {

    this.page = pagina;

  }

}

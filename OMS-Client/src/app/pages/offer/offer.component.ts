import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { BusinessService } from 'src/app/services/business.service';
import { SpinnerService } from 'src/app/services/spinner.service';
import { ToastrService } from 'ngx-toastr';
import { forkJoin } from 'rxjs';
import { LoadImgComponent } from 'src/app/components/load-img/load-img.component';
import { Offer } from 'src/app/model/Offer';
import * as moment from 'moment';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.scss']
})
export class OfferComponent implements OnInit {
  @ViewChildren(LoadImgComponent) files: QueryList<LoadImgComponent>;

  offerForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private builder: FormBuilder,
    private business: BusinessService,
    private spinner: SpinnerService,
    private toast: ToastrService
  ) { }

  ngOnInit() {

    this.offerForm = this.builder.group({
      Id: [0],
      Name: ['', [Validators.required]],
      BeginDate: ['', [Validators.required]],
      EndDate: ['', [Validators.required]],
      Description: ['', [Validators.required]],
      Discount: ['', [Validators.required]],
      IdProduct: ['', [Validators.required, Validators.pattern('^[0-9]{1,10}$')]],
      IsActive: [true],
      Image: this.builder.group({
        Description: ['', [Validators.required]],
        Name: ['', [Validators.required]],
        IsThumbnail: [false],
        Url: [''],
        IdProduct: [0],
        IdOffer: [0]
      })
    });

    this.route.params.subscribe((params: Params) => {

      if (typeof (params.id) !== 'undefined') {

        this.business.GetOfferById(parseInt(params.id, 10)).subscribe((response) => {

          if (!response.Error) {

            this.offerForm.patchValue({
              Id: response.Result.Id,
              Name: response.Result.Name,
              BeginDate: moment(response.Result.BeginDate).format('YYYY-MM-DD'),
              EndDate: moment(response.Result.EndDate).format('YYYY-MM-DD'),
              Description: response.Result.Description,
              Discount: response.Result.Discount,
              IdProduct: response.Result.IdProduct,
              IsActive: response.Result.IsActive,
            });

            this.offerForm.get('Image').patchValue({
              Description: response.Result.Image.Description,
              Name: response.Result.Image.Name,
              IsThumbnail: response.Result.Image.IsThumbnail,
              Url: response.Result.Image.Url,
              IdProduct: response.Result.Image.IdProduct,
              IdOffer: response.Result.Image.IdOffer,
              Id: response.Result.Image.Id
            });

          }
        });
      }
    });

  }

  GetProperty(group: FormGroup, member: string): FormControl {

    return group.get(member) as FormControl;
  }

  GetImage() {

    return this.offerForm.get('Image') as FormGroup;
  }

  saveImages() {

    this.spinner.show();

    const calls = [];

    this.files.toArray().forEach((file) => {

      calls.push(file.onSubmit());

    });

    forkJoin(calls).subscribe((responses) => {

      if (responses.every(response => response)) {

        const offer = this.offerForm.value as Offer;

        if (offer.Id !== 0) {

          this.business.UpdateOffer(offer).subscribe((response) => {

            this.spinner.hide();

            if (!response.Error) {

              this.toast.success('Campaña actualizada satisfactoriamente', 'Exito!');

              this.router.navigate(['/secure/offers']);
            }

          }, (error) => {

            this.spinner.hide();

            this.toast.error('No fue posible actualizar el Campaña', 'Error!');

          });

        } else {

          this.business.CreateOffer(offer).subscribe((response) => {

            this.spinner.hide();

            if (!response.Error) {

              this.toast.success('Campaña creada satisfactoriamente', 'Exito!');

              this.router.navigate(['/secure/offers']);
            }

          }, (error) => {

            this.spinner.hide();

            this.toast.error('No fue posible crear la Campaña', 'Error!');

          });
        }

      } else {

        this.spinner.hide();

        this.toast.error('No fue posible cargar las imagenes', 'Error!');
      }

    });
  }

  onSave() {

    this.saveImages();
  }

}

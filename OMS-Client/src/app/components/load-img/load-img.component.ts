import { Component, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { HttpClient, HttpResponse } from '@angular/common/http';
import * as moment from 'moment';
import { mergeMap, catchError } from 'rxjs/operators';
import { of, Observable } from 'rxjs';
import { BusinessService } from 'src/app/services/business.service';

@Component({
  selector: 'app-load-img',
  templateUrl: './load-img.component.html',
  styleUrls: ['./load-img.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LoadImgComponent),
      multi: true
    }
  ]
})
export class LoadImgComponent implements OnInit, ControlValueAccessor {

  value: string;
  isDisabled: boolean;
  onChange: (obj: any) => void;
  onTouch: () => void;

  fileData: File = null;
  previewUrl: any = null;
  imgName = 'Elegir Imagen';

  constructor(private business: BusinessService) { }

  ngOnInit() {
  }

  SetValue(value: string) {

    this.value = value;
    this.onTouch();
    this.onChange(this.value);

  }

  writeValue(obj: string): void {

    if (obj) {

      this.value = this.previewUrl = obj || '';

    } else {

      this.value = '';
    }

  }

  registerOnChange(fn: any): void {

    this.onChange = fn;

  }

  registerOnTouched(fn: any): void {

    this.onTouch = fn;

  }

  setDisabledState?(isDisabled: boolean): void {

    this.isDisabled = isDisabled;
  }

  fileProgress(fileInput: any) {
    this.fileData = fileInput.target.files[0] as File;
    this.preview();
  }

  preview() {

    const mimeType = this.fileData.type;

    if (mimeType.match(/image\/*/) == null) {
      return;
    }

    this.imgName = this.fileData.name;

    const reader = new FileReader();

    reader.readAsDataURL(this.fileData);
    reader.onload = (event) => {
      this.previewUrl = reader.result;
    };

  }

  onSubmit(): Observable<boolean> {

    const formData = new FormData();

    formData.append('file', this.fileData);

    return this.business.sendFile(formData).pipe(
      mergeMap((response) => {

        this.SetValue(response.Result.path);

        return of(true);
      }),
      catchError((response) => {

        return of(false);
      }));
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.scss']
})
export class MasterComponent implements OnInit {

  constructor(private router: Router) { }

  showSelect = false;

  ngOnInit() {
  }

  logOut() {

    localStorage.clear();

    this.router.navigate(['/login']);

  }

  showSelectReport() {

    this.showSelect = !this.showSelect;

  }

}

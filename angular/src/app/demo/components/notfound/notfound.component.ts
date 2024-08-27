import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-notfound',
    templateUrl: './notfound.component.html',
})
export class NotfoundComponent implements OnInit {

  constructor(
    private _router: Router,
  ) { }

  ngOnInit(): void {
    this._router.navigate(['/main/quan-ly-du-an/pm-quan-ly-du-an']);
  }

 }

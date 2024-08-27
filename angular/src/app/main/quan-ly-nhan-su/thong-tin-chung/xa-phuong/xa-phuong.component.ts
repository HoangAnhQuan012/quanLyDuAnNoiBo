import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';

@Component({
  selector: 'app-xa-phuong',
  templateUrl: './xa-phuong.component.html',
  styleUrls: ['./xa-phuong.component.scss']
})
export class XaPhuongComponent implements OnInit {
  xaPhuongData: any;
  totalCount: number = 0;
  first: number = 0;
  loading = false;

  constructor() { }

  ngOnInit() {
  }

  getAllXaPhuong(lazyLoad?: LazyLoadEvent) { }

}

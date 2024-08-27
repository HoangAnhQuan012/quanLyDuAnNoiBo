import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';

@Component({
  selector: 'app-tinh-thanh',
  templateUrl: './tinh-thanh.component.html',
  styleUrls: ['./tinh-thanh.component.scss']
})
export class TinhThanhComponent implements OnInit {
  tinhThanhData: any;
  totalCount: number = 0;
  first: number = 0;
  loading = false;

  constructor() { }

  ngOnInit() {
  }

  getAllTinhThanh(lazyLoad?: LazyLoadEvent) { }

}

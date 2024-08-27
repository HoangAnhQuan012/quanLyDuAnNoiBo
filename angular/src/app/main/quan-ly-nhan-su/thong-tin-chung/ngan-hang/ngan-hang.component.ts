import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';

@Component({
  selector: 'app-ngan-hang',
  templateUrl: './ngan-hang.component.html',
  styleUrls: ['./ngan-hang.component.scss']
})
export class NganHangComponent implements OnInit {
  nganHangData: any;
  totalCount: number = 0;
  first: number = 0;
  loading = false;

  constructor() { }

  ngOnInit() {
  }

  getAllNganHang(lazyLoad?: LazyLoadEvent) { }

}

import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';

@Component({
  selector: 'app-quoc-gia',
  templateUrl: './quoc-gia.component.html',
  styleUrls: ['./quoc-gia.component.scss']
})
export class QuocGiaComponent implements OnInit {
  quocGiaData: any;
  totalCount: number = 0;
  first: number = 0;
  loading = false;

  constructor() { }

  ngOnInit() {
  }

  getAllQuocGia(lazyLoad?: LazyLoadEvent) { }

}

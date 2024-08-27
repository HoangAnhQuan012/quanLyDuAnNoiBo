import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';

@Component({
  selector: 'app-quan-huyen',
  templateUrl: './quan-huyen.component.html',
  styleUrls: ['./quan-huyen.component.scss']
})
export class QuanHuyenComponent implements OnInit {
  quanHuyenData: any;
  totalCount: number = 0;
  first: number = 0;
  loading = false;

  constructor() { }

  ngOnInit() {
  }

  getAllQuanHuyen(lazyLoad?: LazyLoadEvent) { }

}

import { Component, OnInit } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';

@Component({
  selector: 'app-dan-toc',
  templateUrl: './dan-toc.component.html',
  styleUrls: ['./dan-toc.component.scss']
})
export class DanTocComponent implements OnInit {
  danTocData: any;
  first: number = 0;
  loading = false;
  totalCount: number = 0;

  constructor() { }

  ngOnInit() {
  }

  getAllDanToc(lazyLoad?: LazyLoadEvent) { }

}

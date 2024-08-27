import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { PMDuyetChamCongService, TrangThaiChamCongConsts, TrangThaiPheDuyetChamCongConsts } from '@proxy/cham-cong';
import { GetAllDuAnPMDuyetChamCongOutputDto, GetAllPMDuyetChamCongInputDto } from '@proxy/cham-cong/dtos';
import { LazyLoadEvent } from 'primeng/api';
import { Table } from 'primeng/table';
import { finalize } from 'rxjs';
import { AppComponentBase } from 'src/app/shared/app.component-base';

@Component({
  selector: 'app-phe-duyet-cham-cong',
  templateUrl: './phe-duyet-cham-cong.component.html',
  styleUrls: ['./phe-duyet-cham-cong.component.scss']
})
export class PheDuyetChamCongComponent extends AppComponentBase implements OnInit {

  @ViewChild('dt') table: Table;
  duAnData: GetAllDuAnPMDuyetChamCongOutputDto[] = [];
  loading = false;
  totalCount = 0;
  first = 0;
  minDateValue = new Date();
  maxDateValue = new Date();
  keyword = '';
  date: any;

  constructor(
    injector: Injector,
    private _pmDuyetChamCongService: PMDuyetChamCongService,
    private _router: Router
  ) {
    super(injector);
  }

  ngOnInit() {
  }

  getAllDuAn(lazyLoad?: LazyLoadEvent) {
    this.loading = true;

    const input = {} as GetAllPMDuyetChamCongInputDto;
    input.keyword = this.keyword;
    input.startTime = this.date ? this.date[0] : undefined;
    input.endTime = this.date ? this.date[1] : undefined;
    input.sorting = this.getSortField(this.table);
    input.skipCount = lazyLoad ? this.getSkipCount(lazyLoad, this.table) : 0;
    input.maxResultCount = lazyLoad ? lazyLoad?.rows : this.table?.rows;

    this._pmDuyetChamCongService.getAllDuAnPMDuyetChamCongByInput(input)
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      ).subscribe(result => {
        this.duAnData = result.items;
        this.totalCount = result.totalCount;
      });
  }

  handleShowStatus(trangThai: number) {
    if (trangThai === TrangThaiPheDuyetChamCongConsts.ChoDuyet)
      return 'yellow';

    return 'blue';
  }

  showTrangThai(trangThai: number) {
    if (trangThai === TrangThaiPheDuyetChamCongConsts.ChoDuyet)
      return 'Chờ duyệt';

    return 'Đã duyệt';
  }

  viewDetail(id: string) {
    this._router.navigate([`/main/quan-ly-cham-cong/phe-duyet-cham-cong/pm-quan-ly-cham-cong/${id}`]);
  }

}

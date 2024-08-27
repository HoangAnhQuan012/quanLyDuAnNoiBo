import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PMDuyetChamCongService, TrangThaiChamCongConsts } from '@proxy/cham-cong';
import { DuyetChamCongDanhSachNhanVien, GetListChamCongByDuAnIdInputDto, GetListChamCongByDuAnIdOutputDto } from '@proxy/cham-cong/dtos';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Table } from 'primeng/table';
import { catchError, finalize } from 'rxjs';
import { AppComponentBase } from 'src/app/shared/app.component-base';
import { ChiTietChamCongComponent } from './chi-tiet-cham-cong/chi-tiet-cham-cong.component';

@Component({
  selector: 'app-pm-quan-ly-cham-cong',
  templateUrl: './pm-quan-ly-cham-cong.component.html',
  styleUrls: ['./pm-quan-ly-cham-cong.component.scss']
})
export class PmQuanLyChamCongComponent extends AppComponentBase implements OnInit {

  @ViewChild('dt') table: Table;
  maxDateValue = this.today;
  chamCongData: GetListChamCongByDuAnIdOutputDto[] = [];
  first = 0;
  loading = false;
  totalCount = 10;
  times: any[] = [];
  duAnid: string;
  date: any;
  minDateValue: Date;
  arrChamCongSelected: GetListChamCongByDuAnIdOutputDto[] = [];
  keyword = '';
  ref: DynamicDialogRef | undefined;
  enableBtn = true;

  constructor(
    injector: Injector,
    private _activatedRoute: ActivatedRoute,
    private _pmDuyetChamCongService: PMDuyetChamCongService,
    public dialogService: DialogService,
  ) {
    super(injector);
  }

  ngOnInit() {
    this._activatedRoute.params.subscribe((params) => {
      this.duAnid = params['id'];
    });
    this.minDateValue = new Date(this.maxDateValue.getFullYear(), this.maxDateValue.getMonth(), 1);
  }

  getAllCC(lazyLoad?: any) {
    this.loading = true;

    const input = {} as GetListChamCongByDuAnIdInputDto;
    input.keyword = this.keyword;
    input.duAnId = this.duAnid;
    input.startTime = this.minDateValue.toISOString();
    input.endTime = this.maxDateValue.toISOString();
    input.sorting = this.getSortField(lazyLoad);
    input.sorting = this.getSortField(this.table);
    input.skipCount = lazyLoad ? this.getSkipCount(lazyLoad, this.table) : 0;
    input.maxResultCount = lazyLoad ? lazyLoad?.rows : this.table?.rows;

    this._pmDuyetChamCongService.getListChamCongByDuAnIdByInput(input)
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      ).subscribe(result => {
        this.chamCongData = result.items;
        this.totalCount = result.totalCount;
        this.enableBtn = this.chamCongData.some(x => x.listChamCong.some(y => y.trangThaiChamCong === TrangThaiChamCongConsts.ChoDuyet));
      });
  }

  onChange(event: any) {
    console.log(event);
  }

  handleStyleHour(trangThai: TrangThaiChamCongConsts, isNghiNuaNgay, isDayOff) {
    if (isNghiNuaNgay && trangThai === TrangThaiChamCongConsts.DaDuyet) {
      return 'yellow';
    } else if (isDayOff) {
      return 'dayoff';
    } else if (isNghiNuaNgay && trangThai === TrangThaiChamCongConsts.ChoDuyet) {
      return 'red';
    } else if (trangThai === TrangThaiChamCongConsts.ChoDuyet) {
      return 'yellow';
    } else if (trangThai === TrangThaiChamCongConsts.TuChoi) {
      return 'red';
    } else {
      return 'default';
    }
  }

  checkSelected() { }

  viewDetail(ngayChamCong: any, nhanVienId: string, chamCongId: string, tenNhanVien: string) {
    if (ngayChamCong && nhanVienId && chamCongId) {
      let contentStyle = {
        overflow: 'hidden',
        padding: '16px 24px',
        borderRadius: '8px',
      };
      let width = '1765px';
      let height = '582px';
      this.ref = this.dialogService.open(ChiTietChamCongComponent, {
        data: { ngayChamCong: ngayChamCong, nhanVienId: nhanVienId, chamCongId: chamCongId, tenNhanVien: tenNhanVien },
        width: width,
        height: height,
        contentStyle: contentStyle,
        baseZIndex: 10000,
        maximizable: false,
        showHeader: false,
        dismissableMask: false, // click ra ngoài để tắt dialog
      });
      this.ref.onClose.subscribe((dataReturn) => {
        if (dataReturn?.data) {
          this.getAllCC();
        }
      });
    }
  }

  duyetChamCong() {
    const input = {} as DuyetChamCongDanhSachNhanVien;
    input.startDate = this.minDateValue.toISOString();
    input.endDate = this.maxDateValue.toISOString();
    input.chamCongs = this.arrChamCongSelected.reduce((acc, item) => {
      return acc.concat(item.listChamCong);
    }, []);

    this.loading = true;
    this._pmDuyetChamCongService.duyetChamCongTheoDanhSachNVByInput(input)
      .pipe(
        finalize(() => {
          this.loading = false;
        }),
        catchError((error) => {
          this.showErrorMessage('Duyệt chấm công thất bại');
          return error;
        })
      ).subscribe(result => {
        if (result) {
          this.showCreateSuccessMessage('Duyệt chấm công thành công');
          this.getAllCC();
        } else {
          this.showErrorMessage('Duyệt chấm công thất bại');
        }
      });
  }

  tuChoiDuyet() {
    const input = {} as DuyetChamCongDanhSachNhanVien;
    input.startDate = this.minDateValue.toISOString();
    input.endDate = this.maxDateValue.toISOString();
    input.chamCongs = this.arrChamCongSelected.reduce((acc, item) => {
      return acc.concat(item.listChamCong);
    }, []);

    this.loading = true;
    this._pmDuyetChamCongService.tuChoiChamCongTheoDanhSachNVByInput(input)
      .pipe(
        finalize(() => {
          this.loading = false;
        }),
        catchError((error) => {
          this.showErrorMessage('Từ chối chấm công thất bại');
          return error;
        })
      ).subscribe(result => {
        if (result) {
          this.showCreateSuccessMessage('Từ chối chấm công thành công');
          this.getAllCC();
        } else {
          this.showErrorMessage('Từ chối chấm công thất bại');
        }
      });
  }

}

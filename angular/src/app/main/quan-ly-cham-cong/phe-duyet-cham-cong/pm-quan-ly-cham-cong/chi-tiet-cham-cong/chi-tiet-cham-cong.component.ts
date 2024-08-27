import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { PMDuyetChamCongService, TrangThaiChamCongConsts } from '@proxy/cham-cong';
import { DuyetChamCongListInputDto, GetThongTinChamCongChiTietOutputDto } from '@proxy/cham-cong/dtos';
import { TrangThaiDuAnConsts, TrangThaiSubtaskConsts } from '@proxy/du-an';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Table } from 'primeng/table';
import { catchError, finalize } from 'rxjs';
import { AppComponentBase } from 'src/app/shared/app.component-base';

@Component({
  selector: 'app-chi-tiet-cham-cong',
  templateUrl: './chi-tiet-cham-cong.component.html',
  styleUrls: ['./chi-tiet-cham-cong.component.scss']
})
export class ChiTietChamCongComponent extends AppComponentBase implements OnInit {

  @ViewChild('dt') table: Table;
  chamCongData: GetThongTinChamCongChiTietOutputDto[] = [];
  loading: boolean;
  first: number = 0;
  totalCount: number = 3;

  expandedRows = {};
  ngayChamCong: any;
  nhanVienId: string;
  chamCongId: string;
  tenNhanVien: string;
  disableBtn = false;

  arrChamCongSelected: GetThongTinChamCongChiTietOutputDto[] = [];


  constructor(
    injector: Injector,
    private dialogRef: DynamicDialogRef,
    private dialogConfig: DynamicDialogConfig,
    private _pmDuyetChamCongService: PMDuyetChamCongService,
  ) {
    super(injector);
  }

  ngOnInit() {
    this.nhanVienId = this.dialogConfig?.data?.nhanVienId;
    this.chamCongId = this.dialogConfig?.data?.chamCongId;
    this.ngayChamCong = this.dialogConfig?.data?.ngayChamCong;
    this.tenNhanVien = this.dialogConfig?.data?.tenNhanVien;
  }

  getAllChamCong(lazyloading?: any) {
    this.loading = true;
    this._pmDuyetChamCongService.getThongTinChamCongChiTietByNhanVienIdAndNgayChamCong(this.nhanVienId, this.ngayChamCong)
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe(result => {
        this.chamCongData = result;
        this.disableBtn = this.chamCongData.some(x => x.trangThaiChamCong === TrangThaiChamCongConsts.DaDuyet);
      });
  }

  tuChoi() {
    const input = {} as DuyetChamCongListInputDto;
    input.nhanVienId = this.nhanVienId;
    input.chamCongIds = this.arrChamCongSelected.map(x => x.chamCongId);
    this._pmDuyetChamCongService.tuChoiChamCongChiTietByInput(input)
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
        this.dialogRef.close({ data: true });
      } else {
        this.showErrorMessage('Từ chối chấm công thất bại');
      }
    });
  }

  duyet() {
    const input = {} as DuyetChamCongListInputDto;
    input.nhanVienId = this.nhanVienId;
    input.chamCongIds = this.arrChamCongSelected.map(x => x.chamCongId);
    this._pmDuyetChamCongService.duyetChamCongChiTietByInput(input)
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
        this.dialogRef.close({ data: true });
      } else {
        this.showErrorMessage('Duyệt chấm công thất bại');
      }
    });
  }

  close() {
    this.dialogRef.close();
  }

  expandAll() {
    this.expandedRows = this.chamCongData.reduce((acc, p) => (acc[p.chamCongId] = true) && acc, {});
  }

  collapseAll() {
    this.expandedRows = {};
  }

  handleShowStatusCC(status: number) {
    switch (status) {
      case TrangThaiChamCongConsts.ChoDuyet:
        return 'warning-yellow';
      case TrangThaiChamCongConsts.TuChoi:
        return 'danger-red';
      default:
        return 'init-blue';

    }
  }

  showTrangThaiCC(status: number) {
    switch (status) {
      case TrangThaiChamCongConsts.ChoDuyet:
        return 'Chờ duyệt';
      case TrangThaiChamCongConsts.TuChoi:
        return 'Từ chối';
      default:
        return 'Đã duyệt';
    }
  }

  showTrangThaiCongViec(status: number) {
    switch (status) {
      case TrangThaiSubtaskConsts.ChuaHoanThanh:
      case TrangThaiSubtaskConsts.DaDuocPhanCong:
        return 'Chưa hoàn thành';
      case TrangThaiSubtaskConsts.DaHoanThanh:
        return 'Đã hoàn thành';
      default:
        return 'Quá hạn';
    }
  }

  handleShowtrangThaiCongViec(status: number) {
    switch (status) {
      case TrangThaiSubtaskConsts.ChuaHoanThanh:
        return 'yellow';
      case TrangThaiSubtaskConsts.DaHoanThanh:
        return 'blue';
      default:
        return 'red';
    }
  }

}

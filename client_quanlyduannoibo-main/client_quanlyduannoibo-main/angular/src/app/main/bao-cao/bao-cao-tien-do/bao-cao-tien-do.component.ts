import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BoDQuanLyDuAnService } from '@proxy/bo-dquan-ly-du-an';
import { GetAllDuAnDto, GetAllDuAnInputDto } from '@proxy/bo-dquan-ly-du-an/dtos';
import { TrangThaiDuAnConsts } from '@proxy/du-an';
import { LookUpTableService } from '@proxy/global';
import { LookupTableDto } from '@proxy/global/dtos';
import { LazyLoadEvent } from 'primeng/api';
import { Table } from 'primeng/table';
import { catchError, finalize, forkJoin } from 'rxjs';
import { AppComponentBase } from 'src/app/shared/app.component-base';

@Component({
  selector: 'app-bao-cao-tien-do',
  templateUrl: './bao-cao-tien-do.component.html',
  styleUrls: ['./bao-cao-tien-do.component.scss']
})
export class BaoCaoTienDoComponent extends AppComponentBase implements OnInit {

  @ViewChild('dt') table: Table;
  duAnData: GetAllDuAnDto[];
  totalCount: number = 0;
  first: number = 0;
  loading: boolean = false;
  formData: FormGroup;

  khachHang: LookupTableDto<string>;
  PM_list: LookupTableDto<string>[];
  trangThai: LookupTableDto<string>[];

  constructor(
    injector: Injector,
    private _formBuilder: FormBuilder,
    private _lookupTableService: LookUpTableService,
    private _bodQuanLyDuAnService: BoDQuanLyDuAnService,
  ) {
    super(injector);
  }

  ngOnInit() {
    this._initForm();
    forkJoin([this._lookupTableService.getAllKhachHang(),
    this._lookupTableService.getAllQuanLyDuAn(),
    this._lookupTableService.getAllTrangThaiDuAn()]).subscribe(([khachHang, PM, trangThai]) => {
      this.khachHang = khachHang;
      this.PM_list = PM;
      this.trangThai = trangThai;
    });
  }

  _initForm() {
    this.formData = this._formBuilder.group({
      keyword: [''],
      khachHang: [''],
      quanLyDuAn: [''],
      trangThai: [''],
    });
  }

  getAllDuAn(lazyLoad?: LazyLoadEvent) {
    this.loading = true;

    const input = {} as GetAllDuAnInputDto;
    input.keyword = this.formData.get('keyword')?.value;
    input.khachHang = this.formData.get('khachHang')?.value?.id;
    input.trangThai = this.formData.get('trangThai')?.value?.id;
    input.quanLyDuAnId = this.formData.get('quanLyDuAn')?.value?.id;
    input.sorting = this.getSortField(this.table);
    input.skipCount = lazyLoad ? this.getSkipCount(lazyLoad, this.table) : 0;
    input.maxResultCount = lazyLoad ? lazyLoad?.rows : this.table?.rows;

    this._bodQuanLyDuAnService.getAll(input).
      pipe(
        finalize(() => {
          this.loading = false;
        }),
        catchError((error) => {
          return error;
        })
      ).subscribe((result: any) => {
        this.duAnData = result.items;
        this.totalCount = result.totalCount;
      });
  }

  handleShowStatus(status: number) {
    switch (status) {
      case TrangThaiDuAnConsts.KhoiTao:
        return 'init-blue';
      case TrangThaiDuAnConsts.DangThucHien:
        return 'good-green';
      case TrangThaiDuAnConsts.DangTamDung:
        return 'warning-yellow';
      default:
        return 'danger-red';
    }
  }

  showTrangThai(status: number) {
    switch (status) {
      case TrangThaiDuAnConsts.KhoiTao:
        return 'Khởi tạo';
      case TrangThaiDuAnConsts.DangThucHien:
        return 'Đang thực hiện';
      case TrangThaiDuAnConsts.DangTamDung:
        return 'Đang tạm dừng';
      default:
        return 'Kết thúc';
    }
  }
}

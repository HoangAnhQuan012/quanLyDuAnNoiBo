import { PagedResultDto } from '@abp/ng.core';
import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { GetAllDuAnDto, GetAllDuAnInputDto } from '@proxy/bo-dquan-ly-du-an/dtos';
import { TrangThaiDuAnConsts } from '@proxy/du-an';
import { LookUpTableService } from '@proxy/global';
import { LookupTableDto } from '@proxy/global/dtos';
import { NhanVienQuanLyDuAnService } from '@proxy/nhan-vien-quan-ly-du-an';
import { LazyLoadEvent } from 'primeng/api';
import { Table } from 'primeng/table';
import { catchError, finalize, forkJoin } from 'rxjs';
import { AppComponentBase } from 'src/app/shared/app.component-base';

@Component({
  selector: 'app-nhan-su-quan-ly-du-an',
  templateUrl: './nhan-su-quan-ly-du-an.component.html',
  styleUrls: ['./nhan-su-quan-ly-du-an.component.scss']
})
export class NhanSuQuanLyDuAnComponent extends AppComponentBase implements OnInit {

  @ViewChild('dt') table: Table;
  formData: FormGroup;
  khachHang: LookupTableDto<string>;
  PM_list: LookupTableDto<string>[];
  trangThai: LookupTableDto<string>[];
  duAnData: any[];
  loading: boolean = false;
  totalCount: number = 0;
  first: number = 0;

  constructor(
    injector: Injector,
    private _formBuilder: FormBuilder,
    private _nhanVienQuanLyDuAnService: NhanVienQuanLyDuAnService,
    private _lookupTableService: LookUpTableService,
    private _router: Router
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

    this.formData.controls.khachHang.valueChanges.subscribe(() => {
      this.getAllDuAn();
    });

    this.formData.controls.quanLyDuAn.valueChanges.subscribe(() => {
      this.getAllDuAn();
    });

    this.formData.controls.trangThai.valueChanges.subscribe(() => {
      this.getAllDuAn();
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

    this._nhanVienQuanLyDuAnService.getAllDuAnByInput(input).
      pipe(
        finalize(() => {
          this.loading = false;
        }),
        catchError((error) => {
          return error;
        })
      ).subscribe((result: PagedResultDto<GetAllDuAnDto>) => {
        this.duAnData = result.items;
        this.totalCount = result.totalCount;
      });
  }

  view(id: string, tenDuAn: string) {
    this._router.navigate([`/main/quan-ly-du-an/nhan-vien-quan-ly-du-an/${id}`], { queryParams: { tenDuAn: tenDuAn } });
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

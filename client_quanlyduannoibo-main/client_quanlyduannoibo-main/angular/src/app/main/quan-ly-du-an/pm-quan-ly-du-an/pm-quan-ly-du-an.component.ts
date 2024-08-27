import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { Table } from 'primeng/table';
import { AppComponentBase } from 'src/app/shared/app.component-base';
import { Router } from '@angular/router';
import { TrangThaiDuAnConsts } from '@proxy/du-an';
import { PmQuanLyDuAnService } from '@proxy/pm-quan-ly-du-an';
import { GetAllDuAnByPmInputDto } from '@proxy/pm-quan-ly-du-an/dtos';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LookUpTableService } from '@proxy/global';
import { LookupTableDto } from '@proxy/global/dtos';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-pm-quan-ly-du-an',
  templateUrl: './pm-quan-ly-du-an.component.html',
  styleUrls: ['./pm-quan-ly-du-an.component.scss']
})
export class PmQuanLyDuAnComponent extends AppComponentBase implements OnInit {

  @ViewChild('dt') table: Table;
  duAnData: any[];
  totalCount: number = 0;
  first: number = 0;
  loading: boolean = false;
  formData: FormGroup;

  khachHang: LookupTableDto<string>;
  PM_list: LookupTableDto<string>[];
  trangThai: LookupTableDto<string>[];

  constructor(
    injector: Injector,
    private _router: Router,
    private _pmQuanLyDuAnService: PmQuanLyDuAnService,
    private _lookupTableService: LookUpTableService,
    private _formBuilder: FormBuilder,

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

  getAllDuAn(lazyLoad?: LazyLoadEvent) {
    this.loading = true;

    const input = {} as GetAllDuAnByPmInputDto;
    input.keyword = this.formData.get('keyword')?.value;
    input.khachHang = this.formData.get('khachHang')?.value?.id;
    input.trangThai = this.formData.get('trangThai')?.value?.id;
    input.sorting = this.getSortField(this.table);
    input.skipCount = lazyLoad ? this.getSkipCount(lazyLoad, this.table) : 0;
    input.maxResultCount = lazyLoad ? lazyLoad?.rows : this.table?.rows;

    this._pmQuanLyDuAnService.getAllDuAnByPmByInput(input)
    .subscribe(result => {
      this.duAnData = result.items;
      this.totalCount = result.totalCount;
      this.loading = false;
    })
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

  view(id: string, tenDuAn: string) {
    this._router.navigate([`main/quan-ly-du-an/pm-quan-ly-du-an/xem-chi-tiet-du-an/${id}`], { queryParams: { tenDuAn: tenDuAn } })
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

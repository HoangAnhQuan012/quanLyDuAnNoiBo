import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NhanVienChamCongService } from '@proxy/cham-cong';
import { GetAllDuAnChamCongDto, GetAllDuAnChamCongInput } from '@proxy/cham-cong/dtos';
import { TrangThaiDuAnConsts } from '@proxy/du-an';
import { LookUpTableService } from '@proxy/global';
import { LookupTableDto } from '@proxy/global/dtos';
import { LazyLoadEvent } from 'primeng/api';
import { Table } from 'primeng/table';
import { finalize, forkJoin } from 'rxjs';
import { AppComponentBase } from 'src/app/shared/app.component-base';

@Component({
  selector: 'app-cham-cong',
  templateUrl: './cham-cong.component.html',
  styleUrls: ['./cham-cong.component.scss']
})
export class ChamCongComponent extends AppComponentBase implements OnInit {

  @ViewChild('dt') table: Table;
  formData: FormGroup;
  khachHang: LookupTableDto<string>;;
  trangThai: LookupTableDto<string>[];
  duAnData: GetAllDuAnChamCongDto[] = [];
  loading = false;
  first: number = 0;
  totalCount: number = 0;

  constructor(
    injector: Injector,
    private _fb: FormBuilder,
    private _router: Router,
    private _nhanVienChamCongService: NhanVienChamCongService,
    private _lookupTableService: LookUpTableService,
  ) {
    super(injector);
   }

  ngOnInit() {
    this._initForm();
    forkJoin([this._lookupTableService.getAllKhachHang(),
      this._lookupTableService.getAllTrangThaiDuAn()]).subscribe(([khachHang, trangThai]) => {
        this.khachHang = khachHang;
        this.trangThai = trangThai;
      });
  }

  _initForm() {
    this.formData = this._fb.group({
      keyword: [''],
      khachHang: [''],
      quanLyDuAn: [''],
      trangThai: [''],
    });

    this.formData.controls.khachHang.valueChanges.subscribe(value => {
      this.getAllDuAn();
    });

    this.formData.controls.trangThai.valueChanges.subscribe(value => {
      this.getAllDuAn();
    });
  }

  getAllDuAn(lazyLoad?: LazyLoadEvent) {
    this.loading = true;

    const input = {} as GetAllDuAnChamCongInput;
    input.keyword = this.formData.get('keyword')?.value;
    input.khachHang = this.formData.get('khachHang')?.value;
    input.trangThai = this.formData.get('trangThai')?.value;
    input.sorting = this.getSortField(this.table);
    input.skipCount = lazyLoad ? this.getSkipCount(lazyLoad, this.table) : 0;
    input.maxResultCount = lazyLoad ? lazyLoad?.rows : this.table?.rows;

    this._nhanVienChamCongService.getAllDuAnChamCongByInput(input)
    .pipe(
      finalize(() => {
        this.loading = false;
      })
    ).subscribe(result => {
      this.duAnData = result.items;
      this.totalCount = result.totalCount;
    })

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

  NavigateToChamCong(id: string) {
    this._router.navigate([`/main/quan-ly-cham-cong/cham-cong/nhan-vien-quan-ly-cong-viec/${id}`]);
  }

}

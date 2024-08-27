import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BoDQuanLyDuAnService } from '@proxy/bo-dquan-ly-du-an';
import { GetAllDuAnDto, GetAllDuAnInputDto } from '@proxy/bo-dquan-ly-du-an/dtos';
import { TrangThaiDuAnConsts } from '@proxy/du-an';
import { LookupTableDto } from '@proxy/global/dtos';
import { LazyLoadEvent } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Table } from 'primeng/table';
import { catchError, finalize, forkJoin, throwError } from 'rxjs';
import { AppComponentBase } from 'src/app/shared/app.component-base';
import { ConfirmDeleteComponent } from '../../confirm-delete/confirm-delete.component';
import { LookUpTableService } from '@proxy/global';

@Component({
  selector: 'app-bod-quan-ly-du-an',
  templateUrl: './bod-quan-ly-du-an.component.html',
  styleUrls: ['./bod-quan-ly-du-an.component.scss']
})

export class BodQuanLyDuAnComponent extends AppComponentBase implements OnInit {

  @ViewChild('dt') table: Table;
  duAnData: GetAllDuAnDto[];
  totalCount: number = 0;
  first: number = 0;
  loading: boolean = false;
  formData: FormGroup;
  trangThaiConsts = TrangThaiDuAnConsts

  khachHang: LookupTableDto<string>;
  PM_list: LookupTableDto<string>[];
  trangThai: LookupTableDto<string>[];
  ref: DynamicDialogRef | undefined;


  constructor(
    injector: Injector,
    private _router: Router,
    private _bodQuanLyDuAnService: BoDQuanLyDuAnService,
    private _lookupTableService: LookUpTableService,
    private _formBuilder: FormBuilder,
    public dialogService: DialogService,
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

    this._bodQuanLyDuAnService.getAll(input).
      pipe(
        finalize(() => {
          this.loading = false;
        }),
        catchError((error) => {
          return throwError(error);
        })
      ).subscribe((result) => {
        this.duAnData = result.items;
        this.totalCount = result.totalCount;
      });
  }

  create() {
    this._router.navigate(['main/quan-ly-du-an/bod-quan-ly-du-an/them-moi-du-an']);
  }

  edit(id: string) {
    this._router.navigate([`main/quan-ly-du-an/bod-quan-ly-du-an/cap-nhat-du-an/${id}`])
  }

  view(id: string) {
    this._router.navigate([`main/quan-ly-du-an/bod-quan-ly-du-an/cap-nhat-du-an/${id}`], { queryParams: { isView: true } })
  }

  delete(id: string) {
    let contentStyle = {
      overflow: 'hidden',
      padding: '39px 32px 16px',
      borderRadius: '20px',
    };
    let width = '400px';
    let height = '225px';
    this.ref = this.dialogService.open(ConfirmDeleteComponent, {
      data: { title: 'dự án' },
      width: width,
      height: height,
      contentStyle: contentStyle,
      baseZIndex: 10000,
      maximizable: false,
      showHeader: false,
    });
    this.ref.onClose.subscribe((dataReturn) => {
      if (dataReturn.data) {
        this._bodQuanLyDuAnService.deleteDuAn(id).subscribe(() => {
          this.showDeleteSuccessMessage('Xóa thành công!');
          this.getAllDuAn();
        });
      }
    });
  }

  ThayDoiTrangThaiDuAn(id: string, trangThai: TrangThaiDuAnConsts) {
    this._bodQuanLyDuAnService.thayDoiTrangThaiDuAnByIdAndTrangThai(id, trangThai).subscribe(() => {
      this.showUpdateSuccessMessage('Thay đổi trạng thái thành công');
      this.getAllDuAn();
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

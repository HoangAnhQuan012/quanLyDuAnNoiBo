import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AppComponentBase } from 'src/app/shared/app.component-base';
import { CreateOrEditChamCongComponent } from './create-or-edit-cham-cong/create-or-edit-cham-cong.component';
import { GetAllChamCongInputDto, GetAllChamCongListOutput } from '@proxy/cham-cong/dtos';
import { NhanVienChamCongService, TrangThaiChamCongConsts } from '@proxy/cham-cong';
import { ActivatedRoute } from '@angular/router';
import { Table } from 'primeng/table';
import { finalize, forkJoin } from 'rxjs';
import { LookUpTableService } from '@proxy/global';
import { LookupTableDto } from '@proxy/global/dtos';

@Component({
  selector: 'app-nhan-vien-quan-ly-cong-viec',
  templateUrl: './nhan-vien-quan-ly-cong-viec.component.html',
  styleUrls: ['./nhan-vien-quan-ly-cong-viec.component.scss']
})
export class NhanVienQuanLyCongViecComponent extends AppComponentBase implements OnInit {

  @ViewChild('dt') table: Table;
  chamCongData: GetAllChamCongListOutput[] = [];
  first: number = 0;
  loading = false;
  totalCount: number = 0;
  duAnId: string;

  ref: DynamicDialogRef | undefined;

  sprintOptions: LookupTableDto<"string">[];
  kieuViecOptions: LookupTableDto<"string">[];
  loaiHinhOptions: any[] = [];

  constructor(
    injector: Injector,
    public dialogService: DialogService,
    private _nhanVienChamCongService: NhanVienChamCongService,
    private _activatedRoute: ActivatedRoute,
    private _lookupTableService: LookUpTableService,
  ) {
    super(injector);
  }

  ngOnInit() {
    this._activatedRoute.params.subscribe((params) => {
      this.duAnId = params['id'];
    });
    forkJoin([
      this._lookupTableService.getAllSprintDuAnByCurrentUserByDuAnId(this.duAnId),
      this._lookupTableService.getAllKieuViec(),
      this._lookupTableService.getAllLoaiHinhCongViec(),
    ]).subscribe(([sprints, kieuViecs, loaiHinhs]) => {
      this.sprintOptions = sprints;
      this.kieuViecOptions = kieuViecs;
      this.loaiHinhOptions = loaiHinhs;
    });
  }

  getAllChamCong(lazyLoad?: LazyLoadEvent) {
    this.loading = true;

    const input = {} as GetAllChamCongInputDto;
    input.duAnId = this.duAnId;
    input.sorting = this.getSortField(this.table);
    input.skipCount = lazyLoad ? this.getSkipCount(lazyLoad, this.table) : 0;
    input.maxResultCount = lazyLoad ? lazyLoad?.rows : this.table?.rows;

    this._nhanVienChamCongService.getAllChamCongByDuAnIdByInput(input)
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      ).subscribe((result) => {
        this.chamCongData = result.items;
        this.totalCount = result.totalCount;
      });
  }

  create() {
    let contentStyle = {
      overflow: 'hidden',
      padding: '16px 24px',
      borderRadius: '8px',
    };
    let width = '1270px';
    let height = '880px';
    this.ref = this.dialogService.open(CreateOrEditChamCongComponent, {
      data: { duAnId: this.duAnId, sprintOptions: this.sprintOptions, kieuViecOptions: this.kieuViecOptions, loaiHinhOptions: this.loaiHinhOptions },
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
        this.getAllChamCong();
      }
    });
  }

  update(id: string) {
    let contentStyle = {
      overflow: 'hidden',
      padding: '16px 24px',
      borderRadius: '8px',
    };
    let width = '1270px';
    let height = '880px';
    this.ref = this.dialogService.open(CreateOrEditChamCongComponent, {
      data: { duAnId: this.duAnId, isEdit: true, chamCongId: id, sprintOptions: this.sprintOptions, kieuViecOptions: this.kieuViecOptions, loaiHinhOptions: this.loaiHinhOptions },
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
        this.getAllChamCong();
      }
    });
  }

  handleShowStatus(status: number) {
    switch (status) {
      case TrangThaiChamCongConsts.ChoDuyet:
        return 'warning-yellow';
      case TrangThaiChamCongConsts.DaDuyet:
        return 'init-blue';
      default:
        return 'danger-red';

    }
  }

  showTrangThai(status: number) {
    switch (status) {
      case TrangThaiChamCongConsts.ChoDuyet:
        return 'Chờ duyệt';
      case TrangThaiChamCongConsts.DaDuyet:
        return 'Đã duyệt';
      default:
        return 'Từ chối';
    }
  }

  viewDetail(id: string) {
    let contentStyle = {
      overflow: 'hidden',
      padding: '16px 24px',
      borderRadius: '8px',
    };
    let width = '1270px';
    let height = '880px';
    this.ref = this.dialogService.open(CreateOrEditChamCongComponent, {
      data: { duAnId: this.duAnId, chamCongId: id, isView: true, sprintOptions: this.sprintOptions, kieuViecOptions: this.kieuViecOptions, loaiHinhOptions: this.loaiHinhOptions },
      width: width,
      height: height,
      contentStyle: contentStyle,
      baseZIndex: 10000,
      maximizable: false,
      showHeader: false,
      dismissableMask: false, // click ra ngoài để tắt dialog
    });
    this.ref.onClose.subscribe(() => {});
  }

}

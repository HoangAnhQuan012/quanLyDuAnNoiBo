import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { HoSoNhanVienService } from '@proxy/thong-tin-chung/quan-ly-nhan-vien';
import { GetAllInputHoSoNhanVienDto, HoSoNhanVienDto } from '@proxy/thong-tin-chung/quan-ly-nhan-vien/dtos';
import { LazyLoadEvent } from 'primeng/api';
import { Table } from 'primeng/table';
import { finalize } from 'rxjs';
import { AppComponentBase } from 'src/app/shared/app.component-base';
import { CreateOrEditHoSoNhanVienComponent } from './create-or-edit-ho-so-nhan-vien/create-or-edit-ho-so-nhan-vien.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ConfirmDeleteComponent } from 'src/app/main/confirm-delete/confirm-delete.component';

@Component({
  selector: 'app-ho-so-nhan-vien',
  templateUrl: './ho-so-nhan-vien.component.html',
  styleUrls: ['./ho-so-nhan-vien.component.scss']
})
export class HoSoNhanVienComponent extends AppComponentBase implements OnInit {

  @ViewChild('dt') table: Table;
  hoSoNhanVienData: HoSoNhanVienDto[];
  loading = false;
  totalCount = 0;
  first = 0;
  keyword: string;

  ref: DynamicDialogRef | undefined;

  constructor(
    injector: Injector,
    private _hoSoNhanVienService: HoSoNhanVienService,
    public dialogService: DialogService,
  ) {
    super(injector);
   }

  ngOnInit() {
  }

  getAllHoSoNhanVien(lazyLoad?: LazyLoadEvent) {
    this.loading = true;

    const input = {} as GetAllInputHoSoNhanVienDto;
    input.keyword = this.keyword;
    input.sorting = this.getSortField(this.table);
    input.skipCount = lazyLoad ? this.getSkipCount(lazyLoad, this.table) : 0;
    input.maxResultCount = lazyLoad ? lazyLoad?.rows : this.table?.rows;

    this._hoSoNhanVienService.getAll(input)
    .pipe(
      finalize(() => {
        this.loading = false;
      })
    ).subscribe((res) => {
      this.hoSoNhanVienData = res.items;
      this.totalCount = res.totalCount;
    });
  }

  create() {
    let contentStyle = {
      overflow: 'hidden',
      padding: '16px 24px',
      borderRadius: '8px',
    };
    let width = '691px';
    let height = '800px';
    this.ref = this.dialogService.open(CreateOrEditHoSoNhanVienComponent, {
      width: width,
      height: height,
      contentStyle: contentStyle,
      baseZIndex: 10000,
      maximizable: false,
      showHeader: false,
      dismissableMask: false, // click ra ngoài để tắt dialog
    });
    this.ref.onClose.subscribe((dataReturn) => {
      if (dataReturn.data) {
        this.getAllHoSoNhanVien();
      }
    });
  }

  viewDetail(id: string) {
    let contentStyle = {
      overflow: 'hidden',
      padding: '16px 24px',
      borderRadius: '8px',
    };
    let width = '691px';
    let height = '800px';
    this.ref = this.dialogService.open(CreateOrEditHoSoNhanVienComponent, {
      data: { id: id, isView: true },
      width: width,
      height: height,
      contentStyle: contentStyle,
      baseZIndex: 10000,
      maximizable: false,
      showHeader: false,
      dismissableMask: false, // click ra ngoài để tắt dialog
    });
    this.ref.onClose.subscribe((dataReturn) => {
      if (dataReturn.data) {
        this.getAllHoSoNhanVien();
      }
    });
  }

  update(id: string) {
    let contentStyle = {
      overflow: 'hidden',
      padding: '16px 24px',
      borderRadius: '8px',
    };
    let width = '691px';
    let height = '800px';
    this.ref = this.dialogService.open(CreateOrEditHoSoNhanVienComponent, {
      data: { id: id, isEdit: true },
      width: width,
      height: height,
      contentStyle: contentStyle,
      baseZIndex: 10000,
      maximizable: false,
      showHeader: false,
      dismissableMask: false, // click ra ngoài để tắt dialog
    });
    this.ref.onClose.subscribe((dataReturn) => {
      if (dataReturn.data) {
        this.getAllHoSoNhanVien();
      }
    });
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
      data: { title: 'hồ sơ' },
      width: width,
      height: height,
      contentStyle: contentStyle,
      baseZIndex: 10000,
      maximizable: false,
      showHeader: false,
    });
    this.ref.onClose.subscribe((dataReturn) => {
      if (dataReturn.data) {
        this._hoSoNhanVienService.deleteHoSoNhanVien(id).subscribe(() => {
          this.showDeleteSuccessMessage('Xóa thành công!');
          this.getAllHoSoNhanVien();
        });
      }
    });
  }

}

import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { ChucDanhService } from '@proxy/danh-muc';
import { ChucDanhDto, GetAllInputChucDanhDto } from '@proxy/danh-muc/dtos';
import { LazyLoadEvent } from 'primeng/api';
import { Table } from 'primeng/table';
import { finalize } from 'rxjs';
import { AppComponentBase } from 'src/app/shared/app.component-base';
import { CreateOrEditChucDanhComponent } from './create-or-edit-chuc-danh/create-or-edit-chuc-danh.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ConfirmDeleteComponent } from '../../confirm-delete/confirm-delete.component';

@Component({
  selector: 'app-chuc-danh',
  templateUrl: './chuc-danh.component.html',
  styleUrls: ['./chuc-danh.component.scss']
})
export class ChucDanhComponent extends AppComponentBase implements OnInit {

  @ViewChild('dt') table: Table;
  chucDanhData: ChucDanhDto[] = [];
  totalCount: number = 0;
  first: number = 0;
  loading = false;
  keyword = '';

  ref: DynamicDialogRef | undefined;

  constructor(
    injector: Injector,
    private _chucDanhService: ChucDanhService,
    public dialogService: DialogService,
  ) {
    super(injector);
   }

  ngOnInit() {
  }

  getAllChucDanh(lazyload?: LazyLoadEvent) {
    this.loading = true;
    const input = {} as GetAllInputChucDanhDto;
    input.keyword = this.keyword;
    input.sorting = this.getSortField(this.table);
    input.skipCount = lazyload ? this.getSkipCount(lazyload, this.table) : 0;
    input.maxResultCount = lazyload ? lazyload?.rows : this.table?.rows;

    this._chucDanhService.getAll(input)
    .pipe(
      finalize(() => {
        this.loading = false
      })
    ).subscribe(res => {
      this.chucDanhData = res.items;
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
    let height = '295px';
    this.ref = this.dialogService.open(CreateOrEditChucDanhComponent, {
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
        this.getAllChucDanh();
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
    let height = '295px';
    this.ref = this.dialogService.open(CreateOrEditChucDanhComponent, {
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
        this.getAllChucDanh();
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
      data: { title: 'chức danh' },
      width: width,
      height: height,
      contentStyle: contentStyle,
      baseZIndex: 10000,
      maximizable: false,
      showHeader: false,
    });
    this.ref.onClose.subscribe((dataReturn) => {
      if (dataReturn.data) {
        this._chucDanhService.deleteChucDanhById(id).subscribe(() => {
          this.showDeleteSuccessMessage('Xóa thành công!');
          this.getAllChucDanh();
        });
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
    let height = '295px';
    this.ref = this.dialogService.open(CreateOrEditChucDanhComponent, {
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
        this.getAllChucDanh();
      }
    });
  }

}

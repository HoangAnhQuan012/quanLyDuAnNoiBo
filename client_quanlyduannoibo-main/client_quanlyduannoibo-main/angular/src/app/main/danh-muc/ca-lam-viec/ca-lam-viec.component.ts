import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { CaLamViecService } from '@proxy/danh-muc';
import { CaLamViecDto, GetAllInputCaLamViecDto } from '@proxy/danh-muc/dtos';
import { LazyLoadEvent } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Table } from 'primeng/table';
import { finalize } from 'rxjs';
import { AppComponentBase } from 'src/app/shared/app.component-base';
import { CreateOrEditCaLamViecComponent } from './create-or-edit-ca-lam-viec/create-or-edit-ca-lam-viec.component';
import { ConfirmDeleteComponent } from '../../confirm-delete/confirm-delete.component';

@Component({
  selector: 'app-ca-lam-viec',
  templateUrl: './ca-lam-viec.component.html',
  styleUrls: ['./ca-lam-viec.component.scss']
})
export class CaLamViecComponent extends AppComponentBase implements OnInit {

  @ViewChild('dt') table: Table;
  caLamViecData: CaLamViecDto[] = [];
  totalCount: number = 0;
  first: number = 0;
  loading = false;
  keyword = '';

  ref: DynamicDialogRef | undefined;

  constructor(
    injector: Injector,
    private _caLamViecService: CaLamViecService,
    public dialogService: DialogService,
  ) {
    super(injector);
   }

  ngOnInit() {
  }

  getAllCaLamViec(lazyLoad?: LazyLoadEvent) {
    this.loading = true;

    const input = {} as GetAllInputCaLamViecDto;
    input.keyword = this.keyword;
    input.sorting = this.getSortField(this.table);
    input.skipCount = lazyLoad ? this.getSkipCount(lazyLoad, this.table) : 0;
    input.maxResultCount = lazyLoad ? lazyLoad?.rows : this.table?.rows;

    this._caLamViecService.getAll(input)
    .pipe(
      finalize(() => {
        this.loading = false
      })
    ).subscribe(res => {
      this.caLamViecData = res.items;
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
    let height = '286px';
    this.ref = this.dialogService.open(CreateOrEditCaLamViecComponent, {
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
        this.getAllCaLamViec();
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
    let height = '286px';
    this.ref = this.dialogService.open(CreateOrEditCaLamViecComponent, {
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
        this.getAllCaLamViec();
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
      data: { title: 'ca làm việc' },
      width: width,
      height: height,
      contentStyle: contentStyle,
      baseZIndex: 10000,
      maximizable: false,
      showHeader: false,
    });
    this.ref.onClose.subscribe((dataReturn) => {
      if (dataReturn.data) {
        this._caLamViecService.deleteCaLamViecById(id).subscribe(() => {
          this.showDeleteSuccessMessage('Xóa thành công!');
          this.getAllCaLamViec();
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
    let height = '286px';
    this.ref = this.dialogService.open(CreateOrEditCaLamViecComponent, {
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
        this.getAllCaLamViec();
      }
    });
  }

}

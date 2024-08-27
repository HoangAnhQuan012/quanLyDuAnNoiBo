import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { ChuyenMonService } from '@proxy/danh-muc';
import { ChuyenMonDto, GetAllInputChuyenMonDto } from '@proxy/danh-muc/dtos';
import { LazyLoadEvent } from 'primeng/api';
import { Table } from 'primeng/table';
import { finalize } from 'rxjs';
import { AppComponentBase } from 'src/app/shared/app.component-base';
import { CreateOrEditChuyenMonComponent } from './create-or-edit-chuyen-mon/create-or-edit-chuyen-mon.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ConfirmDeleteComponent } from '../../confirm-delete/confirm-delete.component';

@Component({
  selector: 'app-chuyen-mon',
  templateUrl: './chuyen-mon.component.html',
  styleUrls: ['./chuyen-mon.component.scss']
})
export class ChuyenMonComponent extends AppComponentBase implements OnInit {

  @ViewChild('dt') table: Table;
  chuyenMonData: ChuyenMonDto[] = [];
  totalCount: number = 0;
  first: number = 0;
  loading = false;
  keyword: string;

  ref: DynamicDialogRef | undefined;

  constructor(
    injector: Injector,
    private _chuyenMonService: ChuyenMonService,
    public dialogService: DialogService,
  ) {
    super(injector);
  }

  ngOnInit() {
  }

  getAllChuyenMon(lazyLoad?: LazyLoadEvent) {
    this.loading = true;

    const input = {} as GetAllInputChuyenMonDto;
    input.keyword = this.keyword;
    input.sorting = this.getSortField(this.table);
    input.skipCount = lazyLoad ? this.getSkipCount(lazyLoad, this.table) : 0;
    input.maxResultCount = lazyLoad ? lazyLoad?.rows : this.table?.rows;

    this._chuyenMonService.getAllChuyenMonByInput(input)
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      ).subscribe(res => {
        this.chuyenMonData = res.items;
        this.totalCount = res.totalCount;
      });
  }

  createChuyenMon() {
    let contentStyle = {
      overflow: 'hidden',
      padding: '16px 24px',
      borderRadius: '8px',
    };
    let width = '700px';
    let height = '400px';
    this.ref = this.dialogService.open(CreateOrEditChuyenMonComponent, {
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
        this.getAllChuyenMon();
      }
    });
  }

  viewDetail(id: any) {
    let contentStyle = {
      overflow: 'hidden',
      padding: '16px 24px',
      borderRadius: '8px',
    };
    let width = '700px';
    let height = '400px';
    this.ref = this.dialogService.open(CreateOrEditChuyenMonComponent, {
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
        this.getAllChuyenMon();
      }
    });
  }

  update(id: any) {
    let contentStyle = {
      overflow: 'hidden',
      padding: '16px 24px',
      borderRadius: '8px',
    };
    let width = '700px';
    let height = '400px';
    this.ref = this.dialogService.open(CreateOrEditChuyenMonComponent, {
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
        this.getAllChuyenMon();
      }
    });
  }

  delete(id: any) {
    let contentStyle = {
      overflow: 'hidden',
      padding: '39px 32px 16px',
      borderRadius: '20px',
    };
    let width = '400px';
    let height = '225px';
    this.ref = this.dialogService.open(ConfirmDeleteComponent, {
      data: { title: 'chuyên môn' },
      width: width,
      height: height,
      contentStyle: contentStyle,
      baseZIndex: 10000,
      maximizable: false,
      showHeader: false,
    });
    this.ref.onClose.subscribe((dataReturn) => {
      if (dataReturn.data) {
        this._chuyenMonService.deleteChuyenMonById(id).subscribe(() => {
          this.showDeleteSuccessMessage('Xóa thành công!');
          this.getAllChuyenMon();
        });
      }
    });
  }

}

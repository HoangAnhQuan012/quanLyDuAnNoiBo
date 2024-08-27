import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { TrinhDoHocVanService } from '@proxy/danh-muc';
import { GetAllInputTrinhDoHocVanDto, TrinhDoHocVanDto } from '@proxy/danh-muc/dtos';
import { LazyLoadEvent } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Table } from 'primeng/table';
import { finalize } from 'rxjs';
import { AppComponentBase } from 'src/app/shared/app.component-base';
import { ConfirmDeleteComponent } from '../../confirm-delete/confirm-delete.component';
import { CreateOrEditTrinhDoHocVanComponent } from './create-or-edit-trinh-do-hoc-van/create-or-edit-trinh-do-hoc-van.component';

@Component({
  selector: 'app-trinh-do-hoc-van',
  templateUrl: './trinh-do-hoc-van.component.html',
  styleUrls: ['./trinh-do-hoc-van.component.scss']
})
export class TrinhDoHocVanComponent extends AppComponentBase implements OnInit {

  @ViewChild('dt') table: Table;
  trinhDoHocVan: TrinhDoHocVanDto[] = [];
  totalCount: number = 0;
  first: number = 0;
  loading = false;
  keyword = '';

  ref: DynamicDialogRef | undefined;

  constructor(
    injector: Injector,
    private _trinhDoHocVanService: TrinhDoHocVanService,
    public dialogService: DialogService,
  ) {
    super(injector);
   }

  ngOnInit() {
  }

  getAllTrinhDoHocVan(lazyLoad?: LazyLoadEvent) {
    this.loading = true;

    const input = {} as GetAllInputTrinhDoHocVanDto;
    input.keyword = this.keyword;
    input.sorting = this.getSortField(this.table);
    input.skipCount = lazyLoad ? this.getSkipCount(lazyLoad, this.table) : 0;
    input.maxResultCount = lazyLoad ? lazyLoad?.rows : this.table?.rows;

    this._trinhDoHocVanService.getAll(input)
    .pipe(
      finalize(() => {
        this.loading = false
      })
    ).subscribe(res => {
      this.trinhDoHocVan = res.items;
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
    this.ref = this.dialogService.open(CreateOrEditTrinhDoHocVanComponent, {
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
        this.getAllTrinhDoHocVan();
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
    this.ref = this.dialogService.open(CreateOrEditTrinhDoHocVanComponent, {
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
        this.getAllTrinhDoHocVan();
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
    let height = 'auto';
    this.ref = this.dialogService.open(ConfirmDeleteComponent, {
      data: { title: 'trình độ học vấn' },
      width: width,
      height: height,
      contentStyle: contentStyle,
      baseZIndex: 10000,
      maximizable: false,
      showHeader: false,
    });
    this.ref.onClose.subscribe((dataReturn) => {
      if (dataReturn.data) {
        this._trinhDoHocVanService.deleteTrinhDoHocVanById(id).subscribe(() => {
          this.showDeleteSuccessMessage('Xóa thành công!');
          this.getAllTrinhDoHocVan();
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
    this.ref = this.dialogService.open(CreateOrEditTrinhDoHocVanComponent, {
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
        this.getAllTrinhDoHocVan();
      }
    });
  }

}

import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { PhongBanService } from '@proxy/danh-muc';
import { GetAllInputPhongBanDto, PhongBanDto } from '@proxy/danh-muc/dtos';
import { LazyLoadEvent } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Table } from 'primeng/table';
import { finalize } from 'rxjs';
import { AppComponentBase } from 'src/app/shared/app.component-base';
import { CreateOrEditPhongBanComponent } from './create-or-edit-phong-ban/create-or-edit-phong-ban.component';
import { ConfirmDeleteComponent } from '../../confirm-delete/confirm-delete.component';

@Component({
  selector: 'app-phong-ban',
  templateUrl: './phong-ban.component.html',
  styleUrls: ['./phong-ban.component.scss']
})
export class PhongBanComponent extends AppComponentBase implements OnInit {

  @ViewChild('dt') table: Table;
  phongBanData: PhongBanDto[] = [];
  totalCount: number = 0;
  first: number = 0;
  loading = false;
  keyword = '';

  ref: DynamicDialogRef | undefined;

  constructor(
    injector: Injector,
    private _phongBanService: PhongBanService,
    public dialogService: DialogService,
  ) {
    super(injector);
   }

  ngOnInit() {
  }

  getAllPhongBan(lazyLoad?: LazyLoadEvent) {
    this.loading = true;
    const input = {} as GetAllInputPhongBanDto;
    input.keyword = this.keyword;
    input.sorting = this.getSortField(this.table);
    input.skipCount = lazyLoad ? this.getSkipCount(lazyLoad, this.table) : 0;
    input.maxResultCount = lazyLoad ? lazyLoad?.rows : this.table?.rows;

    this._phongBanService.getAllPhongBanByInput(input)
    .pipe(
      finalize(() => {
        this.loading = false;
      })
    ).subscribe(res => {
      this.phongBanData = res.items;
      this.totalCount = res.totalCount;
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
    this.ref = this.dialogService.open(CreateOrEditPhongBanComponent, {
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
        this.getAllPhongBan();
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
      data: { title: 'phòng ban' },
      width: width,
      height: height,
      contentStyle: contentStyle,
      baseZIndex: 10000,
      maximizable: false,
      showHeader: false,
    });
    this.ref.onClose.subscribe((dataReturn) => {
      if (dataReturn.data) {
        this._phongBanService.deletePhongBanById(id).subscribe(() => {
          this.showDeleteSuccessMessage('Xóa thành công!');
          this.getAllPhongBan();
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
    this.ref = this.dialogService.open(CreateOrEditPhongBanComponent, {
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
        this.getAllPhongBan();
      }
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
    this.ref = this.dialogService.open(CreateOrEditPhongBanComponent, {
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
        this.getAllPhongBan();
      }
    });
  }

}

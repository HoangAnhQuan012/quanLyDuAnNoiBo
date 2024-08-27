import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { LoaiHopDongService, ThoiHanLoaiHopDongConst } from '@proxy/danh-muc';
import { GetAllInputLoaiHopDongDto, LoaiHopDongDto } from '@proxy/danh-muc/dtos';
import { LazyLoadEvent } from 'primeng/api';
import { Table } from 'primeng/table';
import { finalize } from 'rxjs';
import { AppComponentBase } from 'src/app/shared/app.component-base';
import { CreateOrEditLoaiHopDongComponent } from './create-or-edit-loai-hop-dong/create-or-edit-loai-hop-dong.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ConfirmDeleteComponent } from '../../confirm-delete/confirm-delete.component';

@Component({
  selector: 'app-loai-hop-dong',
  templateUrl: './loai-hop-dong.component.html',
  styleUrls: ['./loai-hop-dong.component.scss']
})
export class LoaiHopDongComponent extends AppComponentBase implements OnInit {

  @ViewChild('dt') table: Table;
  loaiHopDongata: LoaiHopDongDto[] = [];
  totalCount: number = 0;
  first: number = 0;
  loading = false;
  keyword = '';

  ref: DynamicDialogRef | undefined;

  constructor(
    injector: Injector,
    private _loaiHopDongService: LoaiHopDongService,
    public dialogService: DialogService,
  ) {
    super(injector);
   }

  ngOnInit() {
  }

  getAllLoaiHopDong(lazyLoad?: LazyLoadEvent) {
    this.loading = true;

    const input = {} as GetAllInputLoaiHopDongDto;
    input.keyword = this.keyword;
    input.sorting = this.getSortField(this.table);
    input.skipCount = lazyLoad ? this.getSkipCount(lazyLoad, this.table) : 0;
    input.maxResultCount = lazyLoad ? lazyLoad?.rows : this.table?.rows;

    this._loaiHopDongService.getAll(input)
    .pipe(
      finalize(() => {
        this.loading = false
      })
    ).subscribe(res => {
      this.loaiHopDongata = res.items;
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
    this.ref = this.dialogService.open(CreateOrEditLoaiHopDongComponent, {
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
        this.getAllLoaiHopDong();
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
      data: { title: 'loại hợp đồng' },
      width: width,
      height: height,
      contentStyle: contentStyle,
      baseZIndex: 10000,
      maximizable: false,
      showHeader: false,
    });
    this.ref.onClose.subscribe((dataReturn) => {
      if (dataReturn.data) {
        this._loaiHopDongService.deleteLoaiHopDongById(id).subscribe(() => {
          this.showDeleteSuccessMessage('Xóa thành công!');
          this.getAllLoaiHopDong();
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
    this.ref = this.dialogService.open(CreateOrEditLoaiHopDongComponent, {
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
        this.getAllLoaiHopDong();
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
    this.ref = this.dialogService.open(CreateOrEditLoaiHopDongComponent, {
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
        this.getAllLoaiHopDong();
      }
    });
  }

}

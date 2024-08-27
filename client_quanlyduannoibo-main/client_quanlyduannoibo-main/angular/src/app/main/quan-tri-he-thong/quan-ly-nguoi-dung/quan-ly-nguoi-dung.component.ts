import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { CreateOrEditUserComponent } from './create-or-edit-user/create-or-edit-user.component';
import { LookupTableDto } from '@proxy/global/dtos';
import { ChuyenMonService } from '@proxy/danh-muc';
import { IdentityUserService } from '@abp/ng.identity/proxy';
import { finalize } from 'rxjs';
import { AppComponentBase } from 'src/app/shared/app.component-base';
import { Table } from 'primeng/table';
import { AccountsManagementService } from '@proxy/accounts';
import { AccountDto, GetAllInputAccountDto } from '@proxy/accounts/dtos';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ConfirmDeleteComponent } from '../../confirm-delete/confirm-delete.component';

@Component({
  selector: 'app-quan-ly-nguoi-dung',
  templateUrl: './quan-ly-nguoi-dung.component.html',
  styleUrls: ['./quan-ly-nguoi-dung.component.scss']
})
export class QuanLyNguoiDungComponent extends AppComponentBase implements OnInit {

  @ViewChild('dt') table: Table;
  @ViewChild('createOrEditUser') createOrEditUser: CreateOrEditUserComponent;
  UserData: AccountDto[] = [];
  totalCount: number = 0;
  first: number = 0;
  loading: boolean = false;
  chuyenMonData: LookupTableDto[] = [];
  keyword: string;
  formData: FormGroup;

  ref: DynamicDialogRef | undefined;

  constructor(
    private _chuyenMonService: ChuyenMonService,
    private _userService: AccountsManagementService,
    private _fb: FormBuilder,
    public dialogService: DialogService,
    private _identityUserService: IdentityUserService,
    injector: Injector
  ) {
    super(injector);
  }

  ngOnInit() {
  }

  getAllUsers(lazyLoad?: LazyLoadEvent) {
    this.loading = true;

    const input = {} as GetAllInputAccountDto;
    input.keyword = this.keyword;
    input.sorting = this.getSortField(this.table);
    input.skipCount = lazyLoad ? this.getSkipCount(lazyLoad, this.table) : 0;
    input.maxResultCount = lazyLoad ? lazyLoad?.rows : this.table?.rows;

    this._userService.getAllAccount(input)
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      ).subscribe((res) => {
        this.UserData = res.items;
        this.totalCount = res.totalCount;
      });
  }

  createUser() {
    let contentStyle = {
      overflow: 'hidden',
      padding: '16px 24px',
      borderRadius: '8px',
    };
    let width = '900px';
    let height = '600px';
    this.ref = this.dialogService.open(CreateOrEditUserComponent, {
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
        this.getAllUsers();
      }
    });
  }

  viewDetail(id: any) {
    let contentStyle = {
      overflow: 'hidden',
      padding: '16px 24px',
      borderRadius: '8px',
    };
    let width = '900px';
    let height = '600px';
    this.ref = this.dialogService.open(CreateOrEditUserComponent, {
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
        this.getAllUsers();
      }
    });
  }

  update(id: any) {
    let contentStyle = {
      overflow: 'hidden',
      padding: '16px 24px',
      borderRadius: '8px',
    };
    let width = '900px';
    let height = '600px';
    this.ref = this.dialogService.open(CreateOrEditUserComponent, {
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
        this.getAllUsers();
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
      data: { title: 'người dùng' },
      width: width,
      height: height,
      contentStyle: contentStyle,
      baseZIndex: 10000,
      maximizable: false,
      showHeader: false,
    });
    this.ref.onClose.subscribe((dataReturn) => {
      if (dataReturn.data) {
        this._identityUserService.delete(id).subscribe(() => {
          this.showDeleteSuccessMessage('Xóa thành công!');
          this.getAllUsers();
        });
      }
    });
  }

}

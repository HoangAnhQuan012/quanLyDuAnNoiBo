import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { Table } from 'primeng/table';
import { CreateOrEditPermissionComponent } from './create-or-edit-permission/create-or-edit-permission.component';
import { GetIdentityRolesInput, IdentityRoleDto, IdentityRoleService } from '@abp/ng.identity/proxy';
import { LazyLoadEvent } from 'primeng/api';
import { AppComponentBase } from 'src/app/shared/app.component-base';
import { finalize } from 'rxjs';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ConfirmDeleteComponent } from '../../confirm-delete/confirm-delete.component';
import { PermissionsManagementService } from '@proxy/roles';

@Component({
  selector: 'app-quan-ly-phan-quyen',
  templateUrl: './quan-ly-phan-quyen.component.html',
  styleUrls: ['./quan-ly-phan-quyen.component.scss']
})
export class QuanLyPhanQuyenComponent extends AppComponentBase implements OnInit {

  @ViewChild('dt') table: Table;
  @ViewChild('CreateOrEditPermission') CreateOrEditPermission: CreateOrEditPermissionComponent;
  RoleData: IdentityRoleDto[] = [];
  first = 0;
  loading = false;
  totalCount: number;
  keyword: string;
  input = {} as GetIdentityRolesInput;
  roleId: any;

  ref: DynamicDialogRef | undefined;


  constructor(
    injector: Injector,
    private _rolesService: IdentityRoleService,
    public dialogService: DialogService,
    private _permissionService: PermissionsManagementService,
  ) {
    super(injector);
  }

  ngOnInit() {
  }

  getAllRoles(lazyLoad?: LazyLoadEvent) {
    this.loading = true;
    this.input.filter = this.keyword;
    this.input.sorting = this.getSortField(this.table);
    this.input.skipCount = lazyLoad ? this.getSkipCount(lazyLoad, this.table) : 0;
    this.input.maxResultCount = lazyLoad ? lazyLoad?.rows : this.table?.rows;
    this._rolesService.getList(this.input)
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      ).subscribe((res) => {
        this.RoleData = res.items;
        this.totalCount = res.totalCount;
      });
  }

  createRoles() {
    let contentStyle = {
      overflow: 'hidden',
      padding: '16px 24px',
      borderRadius: '8px',
    };
    let width = '700px';
    let height = '400px';
    this.ref = this.dialogService.open(CreateOrEditPermissionComponent, {
      width: width,
      height: height,
      contentStyle: contentStyle,
      baseZIndex: 10000,
      maximizable: false,
      showHeader: false,
      dismissableMask: false, // click ra ngoài để tắt dialog
    });
    this.ref.onClose.subscribe(() => {
      this.getAllRoles();
    });
  }

  editRole(role: IdentityRoleDto) {
    let contentStyle = {
      overflow: 'hidden',
      padding: '16px 24px',
      borderRadius: '8px',
    };
    let width = '700px';
    let height = '400px';
    this.ref = this.dialogService.open(CreateOrEditPermissionComponent, {
      data: { role: role, isEdit: true },
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
        this.getAllRoles();
      }
    });
  }

  deleteRole(role: IdentityRoleDto) {
    this.confirmDeleteRole(role);
  }

  confirmDeleteRole(role: IdentityRoleDto) {
    let contentStyle = {
      overflow: 'hidden',
      padding: '39px 32px 16px',
      borderRadius: '20px',
    };
    let width = '400px';
    let height = 'auto';
    this.ref = this.dialogService.open(ConfirmDeleteComponent, {
      data: { title: 'vai trò' },
      width: width,
      height: height,
      contentStyle: contentStyle,
      baseZIndex: 10000,
      maximizable: false,
      showHeader: false,
    });
    this.ref.onClose.subscribe(() => {
      this._rolesService.delete(role.id).subscribe(() => {
        this._permissionService.delete(role.name).subscribe(() => {
          this.showDeleteSuccessMessage('Xóa thành công!');
          this.getAllRoles();
        });
      });
    });
  }

}

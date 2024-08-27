import { Component, Injector } from '@angular/core';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AppComponentBase } from 'src/app/shared/app.component-base';
import { CreateOrEditPermissionComponent } from '../create-or-edit-permission.component';
import { IdentityRoleCreateDto, IdentityRoleService } from '@abp/ng.identity/proxy';
import { UpdatePermissionsDto } from '@proxy/volo/abp/permission-management';
import { PermissionsManagementService } from '@proxy/roles';

@Component({
  selector: 'app-confirm-update-permission',
  templateUrl: './confirm-update-permission.component.html',
  styleUrls: ['./confirm-update-permission.component.scss']
})
export class ConfirmUpdatePermissionComponent extends AppComponentBase {

  ref: DynamicDialogRef | undefined;
  roleData: IdentityRoleCreateDto;
  roleId: any;
  permissionDto = {} as UpdatePermissionsDto;

  constructor(
    private dialogRef: DynamicDialogRef,
    private dialogService: DialogService,
    private _roleService: IdentityRoleService,
    private dialogConfig: DynamicDialogConfig,
    private _permissionManagementService: PermissionsManagementService,
    injector: Injector
  ) {
    super(injector);
  }

  save(): void {
    this.update();
  }

  closeDialog(): void {
    this.dialogRef.close({ data: true });
    let contentStyle = {
      overflow: 'hidden',
      padding: '16px 24px',
      borderRadius: '8px',
    };
    let width = '700px';
    let height = '400px';
    this.ref = this.dialogService.open(CreateOrEditPermissionComponent, {
      data: {
        roleData: this.dialogConfig.data.input,
        roleId: this.dialogConfig.data.roleId,
        permissionDto: this.dialogConfig.data.permissionDto,
        isCancel: true
      },
      width: width,
      height: height,
      contentStyle: contentStyle,
      baseZIndex: 10000,
      maximizable: false,
      showHeader: false,
      dismissableMask: false, // click ra ngoài để tắt dialog
    });
    this.ref.onClose.subscribe(() => { });
  }

  update() {
    this.roleData = this.dialogConfig.data.input;
    this.roleId = this.dialogConfig.data.roleId;
    this.permissionDto = this.dialogConfig.data.permissionDto;
    this._roleService.update(this.roleId, this.roleData).subscribe((res) => {
      this._permissionManagementService.updatePermissionGrantByRoleNameAndPermissions(
        this.roleData.name,
        this.permissionDto
      ).subscribe((res) => {
        if (res) {
          this.showUpdateSuccessMessage('Cập nhật thành công');
          this.dialogRef.close({ data: true });
        }
      });
    });

  }

}

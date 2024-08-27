import { IdentityRoleCreateDto, IdentityRoleDto, IdentityRoleService } from '@abp/ng.identity/proxy';
import { Component, Injector, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PermissionsManagementService } from '@proxy/roles/permissions-management.service';
import { PermissionWithGrantedProviders, UpdatePermissionDto, UpdatePermissionsDto } from '@proxy/volo/abp/permission-management';
import * as _ from 'lodash';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { finalize } from 'rxjs';
import { AppComponentBase } from 'src/app/shared/app.component-base';
import { CommonComponent } from 'src/app/shared/validation/common.component';

@Component({
  selector: 'app-create-or-edit-permission',
  templateUrl: './create-or-edit-permission.component.html',
  styleUrls: ['./create-or-edit-permission.component.scss']
})
export class CreateOrEditPermissionComponent extends AppComponentBase implements OnInit {

  @Input() id: any;
  formData: FormGroup;
  permissionsData: PermissionWithGrantedProviders[] = [];
  defaultPermissionCheckedStatus = true;
  checkedPermissionsMap: { [key: string]: boolean } = {};
  permissionCheckedArray = {} as UpdatePermissionsDto;
  saving = false;
  isEdit = false;
  roleId: any;
  ref: DynamicDialogRef | undefined;
  roleData: IdentityRoleDto;
  roleDataFromConfirm: IdentityRoleCreateDto;
  isCancel = false;


  constructor(
    injector: Injector,
    private _permissionService: PermissionsManagementService,
    private _roleService: IdentityRoleService,
    private _formBuilder: FormBuilder,
    private dialogRef: DynamicDialogRef,
    private dialog: DialogService,
    private dialogConfig: DynamicDialogConfig,

  ) {
    super(injector);
  }

  ngOnInit() {
    this._initForm();
    this.isEdit = this.dialogConfig?.data?.isEdit || false;
    this.isCancel = this.dialogConfig?.data?.isCancel || false;
    if (this.isEdit || this.isCancel) {
      this.setValueForEdit();
    } else {
      this.getAllPermissions();
    }
  }

  getAllPermissions() {
    this._permissionService.getAllPermissions().subscribe((res) => {
      this.permissionsData = res;
      this.checkedPermissionsMap = {};
    });
  }

  setValueForEdit() {
    if (this.isCancel) {
      this.roleDataFromConfirm = this.dialogConfig.data.roleData;
      this.roleId = this.dialogConfig.data.roleId;
      this.formData.controls.roleName.setValue(this.roleDataFromConfirm.name);
      this.permissionCheckedArray = this.dialogConfig.data.permissionDto;
      this._permissionService.getAllPermissions().subscribe((res) => {
        this.permissionsData = res;
        this.permissionsData.forEach((permission) => {
          if (this.permissionCheckedArray.permissions.find(x => x.name === permission.name)) {
            this.checkedPermissionsMap[permission.name] = true;
            permission.isGranted = true;
          }
        });
      });

    } else {
      this.roleData = this.dialogConfig.data.role;
      this.isEdit = this.dialogConfig.data.role.name ? true : false;
      this.roleId = this.roleData.id;
      this._permissionService.getAllPermissionsByProviderKeyByProviderKey(this.roleData.name).subscribe((res) => {
        this.formData.controls.roleName.setValue(this.roleData.name);
        this.permissionsData = res;
        const permissions: UpdatePermissionDto[] = [];
        // gán giá trị có isGranted = true vào checkedPermissionsMap sau đó push vào permissions
        this.permissionsData.forEach((permission) => {
          if (permission.isGranted) {
            this.checkedPermissionsMap[permission.name] = true;
            permissions.push({ name: permission.name, isGranted: true });
          }
        });
        this.permissionCheckedArray.permissions = permissions;
      });
    }
  }

  _initForm() {
    this.formData = this._formBuilder.group({
      roleName: ['', [Validators.required]]
    });
  }

  onPermissionChange(permission: PermissionWithGrantedProviders, $event) {
    this.checkedPermissionsMap[permission.name] = $event.target.checked;
  }

  getCheckedPermissions(): UpdatePermissionDto[] {
    const permissions: UpdatePermissionDto[] = [];
    _.forEach(this.checkedPermissionsMap, function (value, key) {
      if (value) {
        permissions.push({ name: key, isGranted: true });
      }
    });
    return permissions;
  }

  getPermissionDonotCheck(): UpdatePermissionDto[] {
    const permissions: UpdatePermissionDto[] = [];
    _.forEach(this.checkedPermissionsMap, function (value, key) {
      if (!value) {
        permissions.push({ name: key, isGranted: false });
      }
    });
    return permissions;
  }

  save() {
    this.saving = true;
    const input = {} as IdentityRoleCreateDto;
    input.name = this.formData.controls.roleName.value;
    input.isDefault = false;
    input.isPublic = true;
    this.permissionCheckedArray.permissions = this.getCheckedPermissions();
    this.permissionCheckedArray.permissions = this.permissionCheckedArray.permissions.concat(this.getPermissionDonotCheck());

    if (!CommonComponent.getControlErr(this.formData)) {
      if (this.isEdit || this.isCancel) {
        this._roleService.update(this.roleId, input).subscribe((res) => {
          this._permissionService.updatePermissionGrantByRoleNameAndPermissions(
            this.roleData.name,
            this.permissionCheckedArray
          ).pipe(
            finalize(() => {
              this.saving = false;
            })
          ).subscribe((res) => {
            if (res) {
              this.showUpdateSuccessMessage('Cập nhật thành công');
              this.dialogRef.close({ data: true });
            }
          });
        });
      } else {
        this._roleService.create(input)
          .subscribe(() => {
            this._permissionService.createPermissionGrantByRoleNameAndPermissions(
              input.name,
              this.permissionCheckedArray
            ).pipe(
              finalize(() => {
                this.saving = false;
              })
            ).subscribe((res) => {
              if (res) {
                this.showCreateSuccessMessage('Thêm mới thành công');
                this.dialogRef.close({ data: true });
              }
            });
          });
      }
    }
  }

  close() {
    this.dialogRef.close();
  }

}

import { Component, Injector, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountsManagementService } from '@proxy/accounts';
import { AccountDto, CreateOrEditAccountDto } from '@proxy/accounts/dtos';
import { ChucDanhService, ChuyenMonService } from '@proxy/danh-muc';
import { LookupTableDto } from '@proxy/global/dtos';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { finalize, forkJoin } from 'rxjs';
import { AppComponentBase } from 'src/app/shared/app.component-base';
import { CommonComponent } from 'src/app/shared/validation/common.component';
import { ValidationComponent } from 'src/app/shared/validation/validation-message.component';
import * as _ from 'lodash';
import { IdentityRoleDto, IdentityRoleService, IdentityUserService } from '@abp/ng.identity/proxy';

@Component({
  selector: 'app-create-or-edit-user',
  templateUrl: './create-or-edit-user.component.html',
  styleUrls: ['./create-or-edit-user.component.scss']
})
export class CreateOrEditUserComponent extends AppComponentBase implements OnInit {
  display = false;
  formData: FormGroup;
  chucDanhData: LookupTableDto[] = [];
  rolesData: IdentityRoleDto[] = [];
  checkedRolesMap: { [key: string]: boolean } = {};
  defaultRoleCheckedStatus = false;
  isEdit = false;
  loading = false;
  input = {} as CreateOrEditAccountDto;
  id: any;
  isView = false;
  accountValue: AccountDto;

  constructor(
    private _formBuilder: FormBuilder,
    private _chucDanhService: ChucDanhService,
    private dialogRef: DynamicDialogRef,
    private _accountService: AccountsManagementService,
    private _roleService: IdentityRoleService,
    private dialogConfig: DynamicDialogConfig,
    private _identityUserService: IdentityUserService,
    injector: Injector
  ) {
    super(injector);
  }

  ngOnInit() {
    this._initForm();
    this.isEdit = this.dialogConfig?.data?.isEdit;
    this.id = this.dialogConfig?.data?.id;
    this.isView = this.dialogConfig?.data?.isView;
    forkJoin([
      this._chucDanhService.getAllChucDanhLookupTable(),
      this._roleService.getAllList()
    ]).subscribe(([chucDanh, roleList]) => {
      if (this.id) {
        this._accountService.getAccount(this.id)
        .subscribe((account) => {
          this.accountValue = account;
          this.rolesData = roleList.items;
          this.setInitialRolesStatus();
          this.setValueForEdit();
          if (this.isView) {
            this.formData.disable();
          }
        });
      }
      this.chucDanhData = chucDanh;
      this.rolesData = roleList.items;
      // else {
      // }
    });
  }

  _initForm() {
    this.formData = this._formBuilder.group({
      ho: ['', [Validators.required]],
      ten: ['', [Validators.required]],
      tenDangNhap: ['', [Validators.required]],
      diaChiEmail: ['', [Validators.required, Validators.email]],
      matKhau: ['', [Validators.required, ValidationComponent.checkValidatePassword]],
      xacNhanMatKhau: ['', [Validators.required, ValidationComponent.checkValidatePassword, ValidationComponent.checkPassworkConfirm]],
      chucDanh: ['', [Validators.required]],
      kichHoat: [true],
    });
  }

  setInitialRolesStatus(): void {
    _.map(this.rolesData, (item) => {
      this.checkedRolesMap[item.name] = this.isRoleChecked(
        item.name
      );
    });
  }

  onRoleChange(role: any, $event) {
    this.checkedRolesMap[role.name] = $event.target.checked;
  }

  isRoleChecked(name: string): boolean {
    if (!this.accountValue?.roleNames?.items) {
      return this.defaultRoleCheckedStatus;
    } else {
      return this.accountValue.roleNames.items.filter((role) => role.name === name).length > 0;
    }
  }

  getCheckedRoles(): string[] {
    const roles: string[] = [];
    _.forEach(this.checkedRolesMap, function (value, key) {
      if (value) {
        roles.push(key);
      }
    });
    return roles;
  }

  save() {
    this.input.roleNames = this.getCheckedRoles();
    if (this.isEdit) {
      this.formData.get('matKhau').clearValidators();
      this.formData.get('matKhau').updateValueAndValidity();
      this.formData.get('xacNhanMatKhau').clearValidators();
      this.formData.get('xacNhanMatKhau').updateValueAndValidity();
    }
    if (CommonComponent.getControlErr(this.formData) === '') {
      this.loading = true;
      this.getValueForSave();

      if (this.isEdit) {
        this.input.id = this.id;
        this._accountService.updateAccount(this.input).subscribe((res) => {
          this.showCreateSuccessMessage('Cập nhật người dùng thành công');
          this.dialogRef.close({ data: true });
        });
      } else {
        this._accountService.createAccount(this.input)
        .pipe(
          finalize(() => {
            this.loading = false;
          })
        ).subscribe((res) => {
          this.showCreateSuccessMessage('Thêm mới người dùng thành công');
          this.dialogRef.close({ data: true });
        });
      }
    } else {
      console.log('err');
    }
  }

  private getValueForSave() {
    this.input.firstName = this.formData.get('ho').value;
    this.input.surName = this.formData.get('ten').value;
    this.input.userName = this.formData.get('tenDangNhap').value;
    this.input.email = this.formData.get('diaChiEmail').value;
    this.input.password = this.formData.get('matKhau').value;
    this.input.chucDanhId = this.formData.get('chucDanh').value?.id;
    this.input.isActive = this.formData.get('kichHoat').value;
  }

  private setValueForEdit() {
    this.formData.get('ho').setValue(this.accountValue.firstName);
    this.formData.get('ten').setValue(this.accountValue.surName);
    this.formData.get('tenDangNhap').setValue(this.accountValue.userName);
    this.formData.get('diaChiEmail').setValue(this.accountValue.email);
    this.formData.get('chucDanh').setValue(this.chucDanhData.find((item) => item.id === this.accountValue.chucDanhId));
    this.formData.get('kichHoat').setValue(this.accountValue.isActive);
  }

  close() {
    this.dialogRef.close();
  }

}

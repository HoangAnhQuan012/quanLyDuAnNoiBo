import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuanTriHeThongRoutingModule } from './quan-tri-he-thong-routing.module';
import { QuanLyNguoiDungComponent } from './quan-ly-nguoi-dung/quan-ly-nguoi-dung.component';
import { QuanLyPhanQuyenComponent } from './quan-ly-phan-quyen/quan-ly-phan-quyen.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CreateOrEditUserComponent } from './quan-ly-nguoi-dung/create-or-edit-user/create-or-edit-user.component';
import { CreateOrEditPermissionComponent } from './quan-ly-phan-quyen/create-or-edit-permission/create-or-edit-permission.component';
import { ConfirmUpdatePermissionComponent } from './quan-ly-phan-quyen/create-or-edit-permission/confirm-update-permission/confirm-update-permission.component';

@NgModule({
  declarations: [
    QuanLyNguoiDungComponent,
    QuanLyPhanQuyenComponent,
    CreateOrEditUserComponent,
    CreateOrEditPermissionComponent,
    ConfirmUpdatePermissionComponent
  ],
  imports: [
    CommonModule,
    QuanTriHeThongRoutingModule,
    SharedModule
  ]
})
export class QuanTriHeThongModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuanLyDuAnRoutingModule } from './quan-ly-du-an-routing.module';
import { BodQuanLyDuAnComponent } from './bod-quan-ly-du-an/bod-quan-ly-du-an.component';
import { PmQuanLyDuAnComponent } from './pm-quan-ly-du-an/pm-quan-ly-du-an.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ThemMoiDuAnComponent } from './bod-quan-ly-du-an/them-moi-du-an/them-moi-du-an.component';
import { CapNhatDuAnComponent } from './bod-quan-ly-du-an/cap-nhat-du-an/cap-nhat-du-an.component';
import { XemChiTietDuAnComponent } from './pm-quan-ly-du-an/xem-chi-tiet-du-an/xem-chi-tiet-du-an.component';
import { CreateOrEditSubtaskComponent } from './pm-quan-ly-du-an/xem-chi-tiet-du-an/create-or-edit-subtask/create-or-edit-subtask.component';
import { CreateOrEditSprintComponent } from './pm-quan-ly-du-an/xem-chi-tiet-du-an/create-or-edit-sprint/create-or-edit-sprint.component';
import { NhanSuQuanLyDuAnComponent } from './nhan-su-quan-ly-du-an/nhan-su-quan-ly-du-an.component';
import { NhanVienXemChiTietComponent } from './nhan-su-quan-ly-du-an/nhan-vien-xem-chi-tiet/nhan-vien-xem-chi-tiet.component';
import { SprintComponent } from './pm-quan-ly-du-an/xem-chi-tiet-du-an/sprint/sprint.component';
import { ThemCongViecComponent } from './pm-quan-ly-du-an/xem-chi-tiet-du-an/sprint/them-cong-viec/them-cong-viec.component';
import { TimeAndEmployeesFormComponent } from './pm-quan-ly-du-an/xem-chi-tiet-du-an/sprint/them-cong-viec/time-and-employees-form/time-and-employees-form.component';


@NgModule({
  declarations: [
    BodQuanLyDuAnComponent,
    PmQuanLyDuAnComponent,
    ThemMoiDuAnComponent,
    CapNhatDuAnComponent,
    XemChiTietDuAnComponent,
    CreateOrEditSubtaskComponent,
    CreateOrEditSprintComponent,
    NhanSuQuanLyDuAnComponent,
    NhanVienXemChiTietComponent,
    SprintComponent,
    ThemCongViecComponent,
    TimeAndEmployeesFormComponent
  ],
  imports: [
    CommonModule,
    QuanLyDuAnRoutingModule,
    SharedModule
  ]
})
export class QuanLyDuAnModule { }

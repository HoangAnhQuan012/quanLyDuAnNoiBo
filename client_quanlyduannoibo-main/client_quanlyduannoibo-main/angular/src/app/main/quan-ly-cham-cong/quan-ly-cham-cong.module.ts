import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuanLyChamCongRoutingModule } from './quan-ly-cham-cong-routing.module';
import { PheDuyetChamCongComponent } from './phe-duyet-cham-cong/phe-duyet-cham-cong.component';
import { ChamCongComponent } from './cham-cong/cham-cong.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NhanVienQuanLyCongViecComponent } from './cham-cong/nhan-vien-quan-ly-cong-viec/nhan-vien-quan-ly-cong-viec.component';
import { CreateOrEditChamCongComponent } from './cham-cong/nhan-vien-quan-ly-cong-viec/create-or-edit-cham-cong/create-or-edit-cham-cong.component';
import { PmQuanLyChamCongComponent } from './phe-duyet-cham-cong/pm-quan-ly-cham-cong/pm-quan-ly-cham-cong.component';
import { ChiTietChamCongComponent } from './phe-duyet-cham-cong/pm-quan-ly-cham-cong/chi-tiet-cham-cong/chi-tiet-cham-cong.component';


@NgModule({
  declarations: [
    PheDuyetChamCongComponent,
    ChamCongComponent,
    NhanVienQuanLyCongViecComponent,
    CreateOrEditChamCongComponent,
    PmQuanLyChamCongComponent,
    ChiTietChamCongComponent
  ],
  imports: [
    CommonModule,
    QuanLyChamCongRoutingModule,
    SharedModule
  ]
})
export class QuanLyChamCongModule { }

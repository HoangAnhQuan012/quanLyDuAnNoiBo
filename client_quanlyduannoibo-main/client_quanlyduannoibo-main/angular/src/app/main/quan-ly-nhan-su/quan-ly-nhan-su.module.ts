import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuanLyNhanSuRoutingModule } from './quan-ly-nhan-su-routing.module';
import { QuanLyNhanSuComponent } from './quan-ly-nhan-su.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ThongTinChungComponent } from './thong-tin-chung/thong-tin-chung.component';
import { ThongTinNhanVienComponent } from './thong-tin-nhan-vien/thong-tin-nhan-vien.component';
import { TrinhDoChuyenMonComponent } from './trinh-do-chuyen-mon/trinh-do-chuyen-mon.component';


@NgModule({
  declarations: [
    QuanLyNhanSuComponent,
  ],
  imports: [
    CommonModule,
    QuanLyNhanSuRoutingModule,
    SharedModule
  ]
})
export class QuanLyNhanSuModule { }

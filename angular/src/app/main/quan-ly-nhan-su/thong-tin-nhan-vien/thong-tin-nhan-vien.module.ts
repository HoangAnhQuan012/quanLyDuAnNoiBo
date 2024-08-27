import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThongTinNhanVienRoutingModule } from './thong-tin-nhan-vien-routing.module';
import { ThongTinNhanVienComponent } from './thong-tin-nhan-vien.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { HoSoNhanVienComponent } from './ho-so-nhan-vien/ho-so-nhan-vien.component';
import { CreateOrEditHoSoNhanVienComponent } from './ho-so-nhan-vien/create-or-edit-ho-so-nhan-vien/create-or-edit-ho-so-nhan-vien.component';


@NgModule({
  declarations: [
    ThongTinNhanVienComponent,
    HoSoNhanVienComponent,
    CreateOrEditHoSoNhanVienComponent
  ],
  imports: [
    CommonModule,
    ThongTinNhanVienRoutingModule,
    SharedModule
  ]
})
export class ThongTinNhanVienModule { }

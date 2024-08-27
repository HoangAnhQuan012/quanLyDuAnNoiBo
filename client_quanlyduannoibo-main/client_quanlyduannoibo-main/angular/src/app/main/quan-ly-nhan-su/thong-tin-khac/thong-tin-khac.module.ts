import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThongTinKhacRoutingModule } from './thong-tin-khac-routing.module';
import { ThongTinKhacComponent } from './thong-tin-khac.component';
import { ChuongTrinhDaoTaoComponent } from './chuong-trinh-dao-tao/chuong-trinh-dao-tao.component';
import { ChuongTrinhPhucLoiComponent } from './chuong-trinh-phuc-loi/chuong-trinh-phuc-loi.component';


@NgModule({
  declarations: [
    ThongTinKhacComponent,
    ChuongTrinhDaoTaoComponent,
    ChuongTrinhPhucLoiComponent,
  ],
  imports: [
    CommonModule,
    ThongTinKhacRoutingModule
  ]
})
export class ThongTinKhacModule { }

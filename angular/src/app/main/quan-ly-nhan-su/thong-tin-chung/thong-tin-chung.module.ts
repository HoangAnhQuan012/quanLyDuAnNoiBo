import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThongTinChungRoutingModule } from './thong-tin-chung-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { NganHangComponent } from './ngan-hang/ngan-hang.component';
import { DanTocComponent } from './dan-toc/dan-toc.component';
import { QuocGiaComponent } from './quoc-gia/quoc-gia.component';
import { TinhThanhComponent } from './tinh-thanh/tinh-thanh.component';
import { QuanHuyenComponent } from './quan-huyen/quan-huyen.component';
import { XaPhuongComponent } from './xa-phuong/xa-phuong.component';


@NgModule({
  declarations: [
    NganHangComponent,
    DanTocComponent,
    QuocGiaComponent,
    TinhThanhComponent,
    QuanHuyenComponent,
    XaPhuongComponent,
  ],
  imports: [
    CommonModule,
    ThongTinChungRoutingModule,
    SharedModule
  ]
})
export class ThongTinChungModule { }

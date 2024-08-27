import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DanhMucRoutingModule } from './danh-muc-routing.module';
import { DanhMucComponent } from './danh-muc.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ChuyenMonComponent } from './chuyen-mon/chuyen-mon.component';
import { CreateOrEditChuyenMonComponent } from './chuyen-mon/create-or-edit-chuyen-mon/create-or-edit-chuyen-mon.component';
import { CaLamViecComponent } from './ca-lam-viec/ca-lam-viec.component';
import { ChucDanhComponent } from './chuc-danh/chuc-danh.component';
import { ChuongTrinhPhucLoiComponent } from './chuong-trinh-phuc-loi/chuong-trinh-phuc-loi.component';
import { KyLuatComponent } from './ky-luat/ky-luat.component';
import { LoaiHopDongComponent } from './loai-hop-dong/loai-hop-dong.component';
import { PhongBanComponent } from './phong-ban/phong-ban.component';
import { TrinhDoHocVanComponent } from './trinh-do-hoc-van/trinh-do-hoc-van.component';
import { ChungChiComponent } from './chung-chi/chung-chi.component';
import { CreateOrEditCaLamViecComponent } from './ca-lam-viec/create-or-edit-ca-lam-viec/create-or-edit-ca-lam-viec.component';
import { CreateOrEditChucDanhComponent } from './chuc-danh/create-or-edit-chuc-danh/create-or-edit-chuc-danh.component';
import { CreateOrEditPhongBanComponent } from './phong-ban/create-or-edit-phong-ban/create-or-edit-phong-ban.component';
import { CreateOrEditLoaiHopDongComponent } from './loai-hop-dong/create-or-edit-loai-hop-dong/create-or-edit-loai-hop-dong.component';
import { CreateOrEditTrinhDoHocVanComponent } from './trinh-do-hoc-van/create-or-edit-trinh-do-hoc-van/create-or-edit-trinh-do-hoc-van.component';


@NgModule({
  declarations: [
    DanhMucComponent,
    ChuyenMonComponent,
    CreateOrEditChuyenMonComponent,
    CaLamViecComponent,
    ChucDanhComponent,
    ChuongTrinhPhucLoiComponent,
    KyLuatComponent,
    LoaiHopDongComponent,
    PhongBanComponent,
    TrinhDoHocVanComponent,
    ChungChiComponent,
    CreateOrEditCaLamViecComponent,
    CreateOrEditChucDanhComponent,
    CreateOrEditPhongBanComponent,
    CreateOrEditLoaiHopDongComponent,
    CreateOrEditTrinhDoHocVanComponent
  ],
  imports: [
    CommonModule,
    DanhMucRoutingModule,
    SharedModule
  ]
})
export class DanhMucModule { }

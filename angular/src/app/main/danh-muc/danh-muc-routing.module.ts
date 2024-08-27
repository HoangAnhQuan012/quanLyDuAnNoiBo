import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChuyenMonComponent } from './chuyen-mon/chuyen-mon.component';
import { CaLamViecComponent } from './ca-lam-viec/ca-lam-viec.component';
import { ChucDanhComponent } from './chuc-danh/chuc-danh.component';
import { ChuongTrinhPhucLoiComponent } from './chuong-trinh-phuc-loi/chuong-trinh-phuc-loi.component';
import { KyLuatComponent } from './ky-luat/ky-luat.component';
import { LoaiHopDongComponent } from './loai-hop-dong/loai-hop-dong.component';
import { PhongBanComponent } from './phong-ban/phong-ban.component';
import { TrinhDoHocVanComponent } from './trinh-do-hoc-van/trinh-do-hoc-van.component';
import { ChungChiComponent } from './chung-chi/chung-chi.component';
import { KyNangComponent } from './ky-nang/ky-nang.component';
import { PhucLoiComponent } from './phuc-loi/phuc-loi.component';

const routes: Routes = [
  { path: 'chuyen-mon', component: ChuyenMonComponent },
  { path: 'ca-lam-viec', component: CaLamViecComponent },
  { path: 'chuc-danh', component: ChucDanhComponent },
  { path: 'chuong-trinh-phuc-loi', component: ChuongTrinhPhucLoiComponent },
  { path: 'ky-luat', component: KyLuatComponent },
  { path: 'loai-hop-dong', component: LoaiHopDongComponent },
  { path: 'phong-ban', component: PhongBanComponent },
  { path: 'trinh-do-hoc-van', component: TrinhDoHocVanComponent },
  { path: 'chung-chi', component: ChungChiComponent },
  { path: 'ky-nang', component: KyNangComponent },
  { path: 'phuc-loi', component: PhucLoiComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DanhMucRoutingModule { }

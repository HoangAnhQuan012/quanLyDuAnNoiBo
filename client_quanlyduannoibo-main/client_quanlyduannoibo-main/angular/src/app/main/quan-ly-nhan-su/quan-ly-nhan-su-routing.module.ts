import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'thong-tin-chung', pathMatch: 'full' },
  { path: 'thong-tin-chung', loadChildren: () => import('./thong-tin-chung/thong-tin-chung.module').then(m => m.ThongTinChungModule) },
  { path: 'thong-tin-nhan-vien', loadChildren: () => import('./thong-tin-nhan-vien/thong-tin-nhan-vien.module').then(m => m.ThongTinNhanVienModule) },
  { path: 'trinh-do-chuyen-mon', loadChildren: () => import('./trinh-do-chuyen-mon/trinh-do-chuyen-mon.module').then(m => m.TrinhDoChuyenMonModule) },
  { path: 'thong-tin-khac', loadChildren: () => import('./thong-tin-khac/thong-tin-khac.module').then(m => m.ThongTinKhacModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuanLyNhanSuRoutingModule { }

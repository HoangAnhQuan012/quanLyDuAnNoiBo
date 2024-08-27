import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BodQuanLyDuAnComponent } from './bod-quan-ly-du-an/bod-quan-ly-du-an.component';
import { PmQuanLyDuAnComponent } from './pm-quan-ly-du-an/pm-quan-ly-du-an.component';
import { ThemMoiDuAnComponent } from './bod-quan-ly-du-an/them-moi-du-an/them-moi-du-an.component';
import { CapNhatDuAnComponent } from './bod-quan-ly-du-an/cap-nhat-du-an/cap-nhat-du-an.component';
import { XemChiTietDuAnComponent } from './pm-quan-ly-du-an/xem-chi-tiet-du-an/xem-chi-tiet-du-an.component';
import { NhanSuQuanLyDuAnComponent } from './nhan-su-quan-ly-du-an/nhan-su-quan-ly-du-an.component';
import { NhanVienXemChiTietComponent } from './nhan-su-quan-ly-du-an/nhan-vien-xem-chi-tiet/nhan-vien-xem-chi-tiet.component';

const routes: Routes = [
  { path: 'bod-quan-ly-du-an', component: BodQuanLyDuAnComponent },
  { path: 'bod-quan-ly-du-an/them-moi-du-an', component: ThemMoiDuAnComponent },
  { path: 'bod-quan-ly-du-an/cap-nhat-du-an/:id', component: CapNhatDuAnComponent },
  { path: 'pm-quan-ly-du-an', component: PmQuanLyDuAnComponent },
  { path: 'pm-quan-ly-du-an/xem-chi-tiet-du-an/:id', component: XemChiTietDuAnComponent },
  { path: 'nhan-vien-quan-ly-du-an', component: NhanSuQuanLyDuAnComponent },
  { path: 'nhan-vien-quan-ly-du-an/:id', component:  NhanVienXemChiTietComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuanLyDuAnRoutingModule { }

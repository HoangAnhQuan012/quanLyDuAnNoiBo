import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PheDuyetChamCongComponent } from './phe-duyet-cham-cong/phe-duyet-cham-cong.component';
import { ChamCongComponent } from './cham-cong/cham-cong.component';
import { NhanVienQuanLyCongViecComponent } from './cham-cong/nhan-vien-quan-ly-cong-viec/nhan-vien-quan-ly-cong-viec.component';
import { PmQuanLyChamCongComponent } from './phe-duyet-cham-cong/pm-quan-ly-cham-cong/pm-quan-ly-cham-cong.component';

const routes: Routes = [
  { path: 'phe-duyet-cham-cong', component: PheDuyetChamCongComponent },
  { path: 'phe-duyet-cham-cong/pm-quan-ly-cham-cong/:id', component: PmQuanLyChamCongComponent },
  { path: 'cham-cong', component: ChamCongComponent },
  { path: 'cham-cong/nhan-vien-quan-ly-cong-viec/:id', component: NhanVienQuanLyCongViecComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuanLyChamCongRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuanLyNguoiDungComponent } from './quan-ly-nguoi-dung/quan-ly-nguoi-dung.component';
import { QuanLyPhanQuyenComponent } from './quan-ly-phan-quyen/quan-ly-phan-quyen.component';

const routes: Routes = [
  { path: 'quan-ly-nguoi-dung', component: QuanLyNguoiDungComponent },
  { path: 'quan-ly-phan-quyen', component: QuanLyPhanQuyenComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuanTriHeThongRoutingModule { }

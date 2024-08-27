import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HoSoNhanVienComponent } from './ho-so-nhan-vien/ho-so-nhan-vien.component';
import { HopDongLaoDongComponent } from './hop-dong-lao-dong/hop-dong-lao-dong.component';

const routes: Routes = [
  { path: '', redirectTo: 'ho-so-nhan-vien', pathMatch: 'full' },
  { path: 'ho-so-nhan-vien', component: HoSoNhanVienComponent },
  { path: 'hop-dong-lao-dong', component: HopDongLaoDongComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ThongTinNhanVienRoutingModule { }

import { permissionGuard } from '@abp/ng.core';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/main/quan-ly-du-an/nhan-vien-quan-ly-du-an', pathMatch: 'full' },
  { path: 'quan-ly-du-an', loadChildren: () => import('./quan-ly-du-an/quan-ly-du-an.module').then(m => m.QuanLyDuAnModule) },
  // { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
  {
    path: 'danhMuc', loadChildren: () => import('./danh-muc/danh-muc.module').then(m => m.DanhMucModule),
    canActivate: [permissionGuard],
    data: {
      requiredPolicy: 'quanLyDuAnNoiBo.DanhMucManagement'
    }},
  { path: 'quan-ly-nhan-su', loadChildren: () => import('./quan-ly-nhan-su/quan-ly-nhan-su.module').then(m => m.QuanLyNhanSuModule) },
  { path: 'quan-tri-he-thong', loadChildren: () => import('./quan-tri-he-thong/quan-tri-he-thong.module').then(m => m.QuanTriHeThongModule),
    canActivate: [permissionGuard],
    data: {
      requiredPolicy: 'quanLyDuAnNoiBo.AccountManagement'
    }
   },
  { path: 'quan-ly-cham-cong', loadChildren: () => import('./quan-ly-cham-cong/quan-ly-cham-cong.module').then(m => m.QuanLyChamCongModule) },
  { path: 'bao-cao', loadChildren: () => import('./bao-cao/bao-cao.module').then(m => m.BaoCaoModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChuongTrinhDaoTaoComponent } from './chuong-trinh-dao-tao/chuong-trinh-dao-tao.component';
import { ChuongTrinhPhucLoiComponent } from './chuong-trinh-phuc-loi/chuong-trinh-phuc-loi.component';

const routes: Routes = [
  { path: '', redirectTo: 'chuong-trinh-dao-tao', pathMatch: 'full' },
  { path: 'chuong-trinh-dao-tao', component: ChuongTrinhDaoTaoComponent },
  { path: 'chuong-trinh-phuc-loi', component: ChuongTrinhPhucLoiComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ThongTinKhacRoutingModule { }

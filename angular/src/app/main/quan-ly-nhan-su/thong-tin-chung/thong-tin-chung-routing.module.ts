import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NganHangComponent } from './ngan-hang/ngan-hang.component';
import { DanTocComponent } from './dan-toc/dan-toc.component';
import { QuocGiaComponent } from './quoc-gia/quoc-gia.component';
import { TinhThanhComponent } from './tinh-thanh/tinh-thanh.component';
import { QuanHuyenComponent } from './quan-huyen/quan-huyen.component';
import { XaPhuongComponent } from './xa-phuong/xa-phuong.component';

const routes: Routes = [
  { path: '', redirectTo: 'ngan-hang', pathMatch: 'full' },
  { path: 'ngan-hang', component: NganHangComponent },
  { path: 'dan-toc', component: DanTocComponent },
  { path: 'quoc-gia', component: QuocGiaComponent },
  { path: 'tinh-thanh', component: TinhThanhComponent },
  { path: 'quan-huyen', component: QuanHuyenComponent },
  { path: 'xa-phuong', component: XaPhuongComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ThongTinChungRoutingModule { }

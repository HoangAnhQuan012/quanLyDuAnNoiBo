import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NgoaiNguComponent } from './ngoai-ngu/ngoai-ngu.component';

const routes: Routes = [
  { path: '', redirectTo: 'chung-chi', pathMatch: 'full' },
  { path: 'ngoai-ngu', component: NgoaiNguComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrinhDoChuyenMonRoutingModule { }

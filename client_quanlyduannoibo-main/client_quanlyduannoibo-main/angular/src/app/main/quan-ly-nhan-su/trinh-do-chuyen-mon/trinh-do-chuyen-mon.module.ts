import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrinhDoChuyenMonRoutingModule } from './trinh-do-chuyen-mon-routing.module';
import { TrinhDoChuyenMonComponent } from './trinh-do-chuyen-mon.component';


@NgModule({
  declarations: [
    TrinhDoChuyenMonComponent
  ],
  imports: [
    CommonModule,
    TrinhDoChuyenMonRoutingModule
  ]
})
export class TrinhDoChuyenMonModule { }

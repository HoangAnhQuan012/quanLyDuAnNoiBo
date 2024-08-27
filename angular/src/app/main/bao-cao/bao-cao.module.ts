import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BaoCaoRoutingModule } from './bao-cao-routing.module';
import { BaoCaoTienDoComponent } from './bao-cao-tien-do/bao-cao-tien-do.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    BaoCaoTienDoComponent
  ],
  imports: [
    CommonModule,
    BaoCaoRoutingModule,
    SharedModule
  ]
})
export class BaoCaoModule { }

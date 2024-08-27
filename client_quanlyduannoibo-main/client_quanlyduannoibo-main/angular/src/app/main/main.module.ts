import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { SharedModule } from '../shared/shared.module';
import { ConfirmDeleteComponent } from './confirm-delete/confirm-delete.component';


@NgModule({
  declarations: [
    MainComponent,
    ConfirmDeleteComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    SharedModule
  ]
})
export class MainModule { }

import { Component, Injector, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AppComponentBase } from 'src/app/shared/app.component-base';

@Component({
  selector: 'app-confirm-delete',
  templateUrl: './confirm-delete.component.html',
  styleUrls: ['./confirm-delete.component.scss']
})
export class ConfirmDeleteComponent extends AppComponentBase implements OnInit {

  title: string;

  constructor(
    private dialogRef: DynamicDialogRef,
    private dialogConfig: DynamicDialogConfig,
    injector: Injector
  ) {
    super(injector);
  }

  ngOnInit() {
    this.title = this.dialogConfig.data.title;
  }

  save() {
    this.dialogRef.close({ data: true });
  }

  close() {
    this.dialogRef.close();
  }

}

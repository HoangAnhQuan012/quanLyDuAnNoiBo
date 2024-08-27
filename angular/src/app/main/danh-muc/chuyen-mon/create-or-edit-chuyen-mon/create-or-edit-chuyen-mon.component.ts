import { Component, Injector, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChuyenMonService } from '@proxy/danh-muc';
import { ChuyenMonDto } from '@proxy/danh-muc/dtos';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { finalize } from 'rxjs';
import { AppComponentBase } from 'src/app/shared/app.component-base';

@Component({
  selector: 'app-create-or-edit-chuyen-mon',
  templateUrl: './create-or-edit-chuyen-mon.component.html',
  styleUrls: ['./create-or-edit-chuyen-mon.component.scss']
})
export class CreateOrEditChuyenMonComponent extends AppComponentBase implements OnInit {

  formData: FormGroup;
  loading = false;
  isView = false;
  isEdit = false;
  id: any;
  disableButton = false;

  constructor(
    injector: Injector,
    private _fb: FormBuilder,
    private dialogRef: DynamicDialogRef,
    private _chuyenMonService: ChuyenMonService,
    private dialogConfig: DynamicDialogConfig,
  ) {
    super(injector);
  }

  ngOnInit() {
    this._initForm();
    this.isView = this.dialogConfig?.data?.isView;
    this.isEdit = this.dialogConfig?.data?.isEdit;
    this.id = this.dialogConfig?.data?.id;
    if (this.id) {
      this._chuyenMonService.getChuyenMonByIdById(this.id)
        .subscribe((res) => {
          this.formData.get('tenChuyenMon').setValue(res.tenChuyenMon);
          this.formData.get('moTa').setValue(res.moTa);
          if (this.isView) {
            this.formData.disable();
            this.disableButton = true;
          }
        });
    }
  }

  _initForm() {
    this.formData = this._fb.group({
      tenChuyenMon: ['', [Validators.required]],
      moTa: [''],
    });
  }

  close() {
    this.dialogRef.close();
  }

  save() {
    this.loading = true;

    const input = {} as ChuyenMonDto;
    input.id = this.id;
    input.tenChuyenMon = this.formData.get('tenChuyenMon').value;
    input.moTa = this.formData.get('moTa').value;

    if (this.isEdit) {
      this._chuyenMonService.updateChuyenMonByInput(input)
        .pipe(
          finalize(() => {
            this.loading = false;
          })
        ).subscribe((res) => {
          if (res) {
            this.showUpdateSuccessMessage('Cập nhật chuyên môn thành công');
            this.dialogRef.close({ data: res });
          }
        });
    } else {
      this._chuyenMonService.createChuyenMonByInput(input)
        .pipe(
          finalize(() => {
            this.loading = false;
          })
        ).subscribe((res) => {
          if (res) {
            this.showCreateSuccessMessage('Thêm mới chuyên môn thành công');
            this.dialogRef.close({ data: res });
          }
        });
    }
  }

}

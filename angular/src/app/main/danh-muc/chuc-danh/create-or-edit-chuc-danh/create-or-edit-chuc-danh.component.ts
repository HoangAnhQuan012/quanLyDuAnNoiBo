import { Component, Injector, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChucDanhService } from '@proxy/danh-muc';
import { ChucDanhDto } from '@proxy/danh-muc/dtos';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { catchError, finalize } from 'rxjs';
import { AppComponentBase } from 'src/app/shared/app.component-base';
import { CommonComponent } from 'src/app/shared/validation/common.component';

@Component({
  selector: 'app-create-or-edit-chuc-danh',
  templateUrl: './create-or-edit-chuc-danh.component.html',
  styleUrls: ['./create-or-edit-chuc-danh.component.scss']
})
export class CreateOrEditChucDanhComponent extends AppComponentBase implements OnInit {

  formData: FormGroup;
  loading = false;
  isView = false;
  isEdit = false;
  id: any;
  disableButton = false;
  chucDanhValue = {} as ChucDanhDto;

  constructor(
    injector: Injector,
    private _fb: FormBuilder,
    private dialogRef: DynamicDialogRef,
    private dialogConfig: DynamicDialogConfig,
    private _chucDanhService: ChucDanhService,
  ) {
    super(injector);
   }

  ngOnInit() {
    this._initForm();
    this.isView = this.dialogConfig?.data?.isView;
    this.isEdit = this.dialogConfig?.data?.isEdit;
    this.id = this.dialogConfig?.data?.id;
    if (this.id) {
      this._chucDanhService.getChucDanhByIdById(this.id)
      .subscribe((res) => {
        this.chucDanhValue = res;
        this.setValueForEdit();
        if (this.isView) {
          this.formData.disable();
        }
      });
    }
  }

  _initForm() {
    this.formData = this._fb.group({
      maChucDanh: ['', [Validators.required]],
      tenChucDanh: ['', [Validators.required]]
    });
  }

  save() {
    if (CommonComponent.getControlErr(this.formData) === '') {
      this.getValueForSave();
      if (this.isEdit) {
        this._chucDanhService.updateChucDanhByInput(this.chucDanhValue)
        .pipe(
          finalize(() => {
            this.loading = false;
          }),
          catchError((err) => {
            this.showErrorMessage(err.error.error.code);
            return err;
          })
        ).subscribe((res) => {
          this.showUpdateSuccessMessage('Cập nhật thành công');
          this.dialogRef.close({ data: true });
        });
      } else {
        this._chucDanhService.createChucDanhByInput(this.chucDanhValue)
        .pipe(
          finalize(() => {
            this.loading = false;
          }),
          catchError((err) => {
            this.showErrorMessage(err.error.error.code);
            return err;
          })
        ).subscribe((res) => {
          this.showCreateSuccessMessage('Thêm mới thành công');
          this.dialogRef.close({ data: true });
        });
      }
    }
  }

  close() {
    this.dialogRef.close();
  }

  private getValueForSave() {
    this.chucDanhValue.maChucDanh = this.formData.get('maChucDanh')?.value;
    this.chucDanhValue.tenChucDanh = this.formData.get('tenChucDanh')?.value;
  }

  private setValueForEdit() {
    this.formData.get('maChucDanh').setValue(this.chucDanhValue.maChucDanh);
    this.formData.get('tenChucDanh').setValue(this.chucDanhValue.tenChucDanh);
  }

}

import { Component, Injector, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PhongBanService } from '@proxy/danh-muc';
import { PhongBanDto } from '@proxy/danh-muc/dtos';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { catchError, finalize } from 'rxjs';
import { AppComponentBase } from 'src/app/shared/app.component-base';
import { CommonComponent } from 'src/app/shared/validation/common.component';

@Component({
  selector: 'app-create-or-edit-phong-ban',
  templateUrl: './create-or-edit-phong-ban.component.html',
  styleUrls: ['./create-or-edit-phong-ban.component.scss']
})
export class CreateOrEditPhongBanComponent extends AppComponentBase implements OnInit {

  formData: FormGroup;
  loading = false;
  isView = false;
  isEdit = false;
  id: any;
  disableButton = false;
  phongBan = {} as PhongBanDto;

  constructor(
    injector: Injector,
    private dialogRef: DynamicDialogRef,
    private dialogConfig: DynamicDialogConfig,
    private _fb: FormBuilder,
    private _phongBanService: PhongBanService,
  ) {
    super(injector);
   }

  ngOnInit() {
    this._initForm();
    this.id = this.dialogConfig?.data?.id;
    this.isView = this.dialogConfig?.data?.isView;
    this.isEdit = this.dialogConfig?.data?.isEdit;
    if(this.id) {
      this._phongBanService.getPhongBanByIdById(this.id).subscribe(res => {
        this.phongBan = res;
        this.setValueForEdit();
        if(this.isView) {
          this.formData.disable();
        }
      });
    }
  }

  _initForm() {
    this.formData = this._fb.group({
      maPhongBan: ['', [Validators.required]],
      tenPhongBan: ['', Validators.required],
      moTa: [''],
    });
  }

  save() {
    if (CommonComponent.getControlErr(this.formData) === '') {
      this.getValueForSave();
     if (this.isEdit) {
      this.phongBan.id = this.id
      this._phongBanService.updatePhongBanByInput(this.phongBan)
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
      this._phongBanService.createPhongBanByInput(this.phongBan)
      .pipe(
        finalize(() => {
          this.loading = false;
        }),
        catchError((err) => {
          this.showErrorMessage(err.error.error.code);
          return err;
        })
      ).subscribe(() => {
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
    this.phongBan.maPhongBan = this.formData.get('maPhongBan')?.value;
    this.phongBan.tenPhongBan = this.formData.get('tenPhongBan')?.value;
    this.phongBan.moTa = this.formData.get('moTa')?.value;
  }

  private setValueForEdit() {
    this.formData.get('maPhongBan')?.setValue(this.phongBan.maPhongBan);
    this.formData.get('tenPhongBan')?.setValue(this.phongBan.tenPhongBan);
    this.formData.get('moTa')?.setValue(this.phongBan.moTa);
  }

}

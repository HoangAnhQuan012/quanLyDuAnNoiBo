import { Component, Injector, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CaLamViecService } from '@proxy/danh-muc';
import { CaLamViecDto } from '@proxy/danh-muc/dtos';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { finalize } from 'rxjs';
import { AppComponentBase } from 'src/app/shared/app.component-base';
import { CommonComponent } from 'src/app/shared/validation/common.component';
import * as moment from 'moment';

@Component({
  selector: 'app-create-or-edit-ca-lam-viec',
  templateUrl: './create-or-edit-ca-lam-viec.component.html',
  styleUrls: ['./create-or-edit-ca-lam-viec.component.scss']
})
export class CreateOrEditCaLamViecComponent extends AppComponentBase implements OnInit {

  formData: FormGroup;
  loading = false;
  isView = false;
  isEdit = false;
  id: any;
  disableButton = false;
  caLamViecData = {} as CaLamViecDto;

  constructor(
    injector: Injector,
    private _fb: FormBuilder,
    private dialogRef: DynamicDialogRef,
    private dialogConfig: DynamicDialogConfig,
    private _caLamViecService: CaLamViecService,
  ) {
    super(injector);
   }

  ngOnInit() {
    this._initForm();
    this.isView = this.dialogConfig?.data?.isView;
    this.isEdit = this.dialogConfig?.data?.isEdit;
    this.id = this.dialogConfig?.data?.id;
    if (this.id) {
      this._caLamViecService.getCaLamViecByIdById(this.id)
      .subscribe((res) => {
        this.caLamViecData = res;
        this.setValueForEdit();
        if (this.isView) {
          this.formData.disable();
        }
      });
    }
  }

  _initForm() {
    this.formData = this._fb.group({
      maCaLamViec: ['', [Validators.required]],
      gioVaoLam: [undefined, [Validators.required]],
      gioTanLam: [undefined, [Validators.required]],
      moTa: [''],
    });
  }

  save() {
    if (CommonComponent.getControlErr(this.formData) === '') {
      this.loading = true;
      this.getValueForSave();
      if (this.isEdit) {
        this.caLamViecData.id = this.id;
        this._caLamViecService.updateCaLamViecByInput(this.caLamViecData)
        .pipe(
          finalize(() => {
            this.loading = false;
          })
        ).subscribe((res) => {
            if (res) {
              this.dialogRef.close({ data: true });
            }
          });
      } else {
        this._caLamViecService.createCaLamViecByInput(this.caLamViecData)
        .pipe(
          finalize(() => {
            this.loading = false;
          })
        ).subscribe((res) => {
            if (res) {
              this.dialogRef.close({ data: true });
            }
        });
      }
    }
  }

  close() {
    this.dialogRef.close();
  }

  private setValueForEdit() {
    this.formData.get('maCaLamViec').setValue(this.caLamViecData.maCaLamViec);
    this.formData.get('gioVaoLam').setValue(CommonComponent.getTimeEditFromString(this.caLamViecData.gioVaoLam));
    this.formData.get('gioTanLam').setValue(CommonComponent.getTimeEditFromString(this.caLamViecData.gioTanLam));
    this.formData.get('moTa').setValue(this.caLamViecData.mota);
  }

  private getValueForSave() {
    this.caLamViecData.maCaLamViec = this.formData.get('maCaLamViec')?.value;
    this.caLamViecData.gioVaoLam = moment(this.formData.get('gioVaoLam')?.value).format(this.timeFormatInsert);
    this.caLamViecData.gioTanLam = moment(this.formData.get('gioTanLam')?.value).format(this.timeFormatInsert);
    this.caLamViecData.mota = this.formData.get('moTa')?.value;
  }

}

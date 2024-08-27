import { Component, Injector, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TrinhDoHocVanService } from '@proxy/danh-muc';
import { TrinhDoHocVanDto } from '@proxy/danh-muc/dtos';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { finalize } from 'rxjs';
import { AppComponentBase } from 'src/app/shared/app.component-base';
import { CommonComponent } from 'src/app/shared/validation/common.component';

@Component({
  selector: 'app-create-or-edit-trinh-do-hoc-van',
  templateUrl: './create-or-edit-trinh-do-hoc-van.component.html',
  styleUrls: ['./create-or-edit-trinh-do-hoc-van.component.scss']
})
export class CreateOrEditTrinhDoHocVanComponent extends AppComponentBase implements OnInit {

  formData: FormGroup;
  loading = false;
  isView = false;
  isEdit = false;
  id: any;
  disableButton = false;
  trinhDoHocVan = {} as TrinhDoHocVanDto;

  constructor(
    injector: Injector,
    private dialogRef: DynamicDialogRef,
    private _fb: FormBuilder,
    private dialogConfig: DynamicDialogConfig,
    private _trinhDoHocVanService: TrinhDoHocVanService,
  ) {
    super(injector);
   }

  ngOnInit() {
    this._initForm();
    this.id = this.dialogConfig?.data?.id;
    this.isView = this.dialogConfig?.data?.isView;
    this.isEdit = this.dialogConfig?.data?.isEdit;
    if (this.id) {
      this._trinhDoHocVanService.getTrinhDoHocVanByIdById(this.id)
      .subscribe(res => {
        this.trinhDoHocVan = res;
        this.setValueForEdit();
        if (this.isView) {
          this.formData.disable();
        }
      });
    }
  }

  _initForm() {
    this.formData = this._fb.group({
      maTrinhDoHocVan: ['', [Validators.required]],
      tenTrinhHoHocVan: ['', [Validators.required]],
      moTa: ['']
    });
  }

  close() {
    this.dialogRef.close();
  }

  save() {
    if(CommonComponent.getControlErr(this.formData) === '') {
      this.getValueForSave();
      if (this.isEdit) {
        this.trinhDoHocVan.id = this.id;
        this._trinhDoHocVanService.updateTrinhDoHocVanByInput(this.trinhDoHocVan)
        .pipe(
          finalize(() => {
            this.loading = false;
          })
        ).subscribe((res) => {
          this.showUpdateSuccessMessage('Cập nhật thành công');
          this.dialogRef.close({ data: true });
        })
      } else {
        this._trinhDoHocVanService.createTrinhDoHocVanByInput(this.trinhDoHocVan)
        .pipe(
          finalize(() => {
            this.loading = false;
          })
        ).subscribe((res) => {
          this.showCreateSuccessMessage('Tạo mới thành công');
          this.dialogRef.close({ data: true });
        });

      }
    }
  }

  private setValueForEdit() {
    this.formData.get('maTrinhDoHocVan')?.setValue(this.trinhDoHocVan.maTrinhDoHocVan);
    this.formData.get('tenTrinhHoHocVan')?.setValue(this.trinhDoHocVan.tenTrinhDoHocVan);
    this.formData.get('moTa')?.setValue(this.trinhDoHocVan.moTa);
  }

  private getValueForSave() {
    this.trinhDoHocVan.maTrinhDoHocVan = this.formData.get('maTrinhDoHocVan')?.value;
    this.trinhDoHocVan.tenTrinhDoHocVan = this.formData.get('tenTrinhHoHocVan')?.value;
    this.trinhDoHocVan.moTa = this.formData.get('moTa')?.value;
  }

}

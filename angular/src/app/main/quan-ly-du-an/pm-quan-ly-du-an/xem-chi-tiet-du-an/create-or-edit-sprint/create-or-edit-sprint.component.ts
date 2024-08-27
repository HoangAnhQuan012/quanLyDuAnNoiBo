import { Component, Injector, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TrangThaiSprintConsts, trangThaiSprintConstsOptions } from '@proxy/du-an';
import { LookUpTableService } from '@proxy/global';
import { LookupTableDto } from '@proxy/global/dtos';
import { PmQuanLyDuAnService } from '@proxy/pm-quan-ly-du-an';
import { ModuleSubTaskDto } from '@proxy/pm-quan-ly-du-an/dtos';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { finalize } from 'rxjs';
import { AppComponentBase } from 'src/app/shared/app.component-base';
import { CommonComponent } from 'src/app/shared/validation/common.component';

@Component({
  selector: 'app-create-or-edit-sprint',
  templateUrl: './create-or-edit-sprint.component.html',
  styleUrls: ['./create-or-edit-sprint.component.scss']
})
export class CreateOrEditSprintComponent extends AppComponentBase implements OnInit {

  disableButton = false;
  modules: ModuleSubTaskDto[] = [];
  duAnId: string;
  formData: FormGroup;
  nhanSu: LookupTableDto<string>[] = [];
  subTaskSelect: any[] = [];
  createOrEditSprintDto = {} as any;

  constructor(
    injector: Injector,
    private dialogRef: DynamicDialogRef,
    private _pmQuanLyDuAnService: PmQuanLyDuAnService,
    private dialogConfig: DynamicDialogConfig,
    private _formBuilder: FormBuilder,
  ) {
    super(injector);
  }

  ngOnInit() {
    this._initForm();
    this.duAnId = this.dialogConfig?.data?.duAnId;
  }

  _initForm() {
    this.formData = this._formBuilder.group({
      tenSprint: ['', Validators.required],
      ngayBatDau: ['', Validators.required],
      ngayKetThuc: ['', Validators.required],
    });
  }

  close() {
    this.dialogRef.close();
  }

  save() {
    if (CommonComponent.getControlErr(this.formData) === '') {
      this.disableButton = true;
      this.getValueForSave();
      this._pmQuanLyDuAnService.createSprint(this.createOrEditSprintDto)
        .pipe(finalize(() => this.disableButton = false))
        .subscribe((res) => {
          this.showCreateSuccessMessage('Thêm mới sprint thành công');
          this.dialogRef.close({ data: true });
        });
    }
  }

  private getValueForSave() {
    this.createOrEditSprintDto.duAnId = this.duAnId;
    this.createOrEditSprintDto.tenSprint = this.formData.get('tenSprint')?.value;
    this.createOrEditSprintDto.ngayBatDau = this.formData.get('ngayBatDau')?.value;
    this.createOrEditSprintDto.ngayKetThuc = this.formData.get('ngayKetThuc')?.value;
    this.createOrEditSprintDto.trangThaiSprint = TrangThaiSprintConsts.KhoiTao;
  }

}

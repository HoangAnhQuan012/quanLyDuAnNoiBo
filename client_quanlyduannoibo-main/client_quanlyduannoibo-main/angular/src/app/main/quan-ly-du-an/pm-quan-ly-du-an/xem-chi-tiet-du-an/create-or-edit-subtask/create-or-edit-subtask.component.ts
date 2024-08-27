import { Component, Injector, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SubTaskDto } from '@proxy/bo-dquan-ly-du-an/dtos';
import { PmQuanLyDuAnService } from '@proxy/pm-quan-ly-du-an';
import { CreateSubTaskDto, ModuleSubTaskDto } from '@proxy/pm-quan-ly-du-an/dtos';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { finalize } from 'rxjs';
import { AppComponentBase } from 'src/app/shared/app.component-base';
import { CommonComponent } from 'src/app/shared/validation/common.component';

@Component({
  selector: 'app-create-or-edit-subtask',
  templateUrl: './create-or-edit-subtask.component.html',
  styleUrls: ['./create-or-edit-subtask.component.scss']
})
export class CreateOrEditSubtaskComponent extends AppComponentBase implements OnInit {

  formData: FormGroup;
  disableButton = false;
  moduleId: string;
  subTaskId: string;
  module = {} as ModuleSubTaskDto;
  CreateSubTaskDtoInput = {} as CreateSubTaskDto;
  isEdit = false;
  subTaskDto = {} as SubTaskDto;

  constructor(
    injector: Injector,
    private dialogRef: DynamicDialogRef,
    private dialogConfig: DynamicDialogConfig,
    private _pmQuanLyDuAnService: PmQuanLyDuAnService,
    private _formBuilder: FormBuilder,
  ) {
    super(injector);
  }

  ngOnInit() {
    this._initForm();
    this.moduleId = this.dialogConfig?.data?.moduleId;
    this.subTaskId = this.dialogConfig?.data?.subTaskId;
    this.isEdit = this.dialogConfig?.data?.isEdit;
    this._pmQuanLyDuAnService.getAllMandayLeftByModuleIdAndSubTaskId(this.moduleId, this.subTaskId).subscribe((res) => {
      this.module = res;

      if (this.isEdit) {
        this._pmQuanLyDuAnService.getSubTaskForEditBySubTaskId(this.subTaskId).subscribe((res) => {
          this.subTaskDto = res;
          this.setValueForEdit();
        });
      }
    });
  }

  _initForm() {
    this.formData = this._formBuilder.group({
      tenSubTask: ['', [Validators.required]],
      pm: ['', [Validators.required]],
      dev: ['', [Validators.required]],
      ba: ['', [Validators.required]],
      test: ['', [Validators.required]],
      tong: ['', [Validators.required]],
    });

    this.formData.get('tong').disable();
  }

  tinhGio() {
    const controlTong = this.formData.get('tong');
    const fields = ['pm', 'dev', 'ba', 'test'];
    let totalHours = 0;

    fields.forEach(field => {
      const control = this.formData.get(field);
      const hours = Number(control.value || 0);
      totalHours += hours;

      if (hours > this.module[field]) {
        this.showWarningMessage(`Đã vượt quá số giờ còn lại: ${this.module[field]}`);
        control.markAsDirty();
        control.markAllAsTouched();
        control.setErrors({ 'incorrect': true });
      }
    });

    controlTong.setValue(totalHours);
  }


  close() {
    this.dialogRef.close();
  }

  save() {
    if (CommonComponent.getControlErr(this.formData) === '') {
      this.disableButton = true;
      this.getValueForSave();
      if (this.isEdit) {
        this.subTaskDto.id = this.subTaskId;
        this._pmQuanLyDuAnService.updateSubtaskByInput(this.subTaskDto)
          .pipe(
            finalize(() => {
              this.disableButton = false;
            })
          ).subscribe(() => {
            this.showUpdateSuccessMessage('Cập nhật thành công');
            this.dialogRef.close({ data: true });
          })
      } else {
        this._pmQuanLyDuAnService.createSubTaskByModuleIdByInput(this.CreateSubTaskDtoInput)
          .pipe(
            finalize(() => {
              this.disableButton = false;
            })
          ).subscribe(() => {
            this.showUpdateSuccessMessage('Thêm mới thành công');
            this.dialogRef.close({ data: true });
          })
      }
    }
  }

  private getValueForSave() {
    this.CreateSubTaskDtoInput.moduleId = this.moduleId;
    this.CreateSubTaskDtoInput.tenSubTask = this.formData.get('tenSubTask').value;
    this.CreateSubTaskDtoInput.pm = this.formData.get('pm').value;
    this.CreateSubTaskDtoInput.dev = this.formData.get('dev').value;
    this.CreateSubTaskDtoInput.ba = this.formData.get('ba').value;
    this.CreateSubTaskDtoInput.test = this.formData.get('test').value;
  }

  private setValueForEdit() {
    this.formData.get('tenSubTask').setValue(this.subTaskDto.tenSubTask);
    this.formData.get('pm').setValue(this.subTaskDto.pm);
    this.formData.get('dev').setValue(this.subTaskDto.dev);
    this.formData.get('ba').setValue(this.subTaskDto.ba);
    this.formData.get('test').setValue(this.subTaskDto.test);
    this.formData.get('tong').setValue(this.subTaskDto.pm + this.subTaskDto.dev + this.subTaskDto.ba + this.subTaskDto.test);
  }

}

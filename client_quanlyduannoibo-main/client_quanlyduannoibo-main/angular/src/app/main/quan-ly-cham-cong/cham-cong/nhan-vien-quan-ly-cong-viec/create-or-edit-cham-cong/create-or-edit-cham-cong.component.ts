import { Component, Injector, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NhanVienChamCongService } from '@proxy/cham-cong';
import { CongViecDto, CreateOrUpdateChamCongInputDto } from '@proxy/cham-cong/dtos';
import { LookUpTableService } from '@proxy/global';
import { LookupTableDto } from '@proxy/global/dtos';
import * as moment from 'moment';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subscription, catchError, finalize } from 'rxjs';
import { AppComponentBase } from 'src/app/shared/app.component-base';
import { CommonComponent } from 'src/app/shared/validation/common.component';

@Component({
  selector: 'app-create-or-edit-cham-cong',
  templateUrl: './create-or-edit-cham-cong.component.html',
  styleUrls: ['./create-or-edit-cham-cong.component.scss']
})
export class CreateOrEditChamCongComponent extends AppComponentBase implements OnInit {

  formData: FormGroup;
  time: number = 0;
  maxFileSize: number = 1000000;

  taskOptions: LookupTableDto<"string">[];
  subtaskOptions: LookupTableDto<"string">[];
  sprintOptions: LookupTableDto<"string">[];
  kieuViecOptions: LookupTableDto<"string">[];
  loaiHinhOptions: any[] = [];
  currentSprintId: string;

  minDateValue: Date;
  maxDateValue = this.today;

  subscription: Subscription = new Subscription();
  isCompleted = false;

  input = {} as CreateOrUpdateChamCongInputDto;
  duAnId: string;
  loading = false;
  chamCongId: string;
  isView = false;
  isEdit = false;

  valueForEdit = {} as CreateOrUpdateChamCongInputDto;

  constructor(
    injector: Injector,
    private dialogRef: DynamicDialogRef,
    private _formBuilder: FormBuilder,
    private _lookupTableService: LookUpTableService,
    private dialogConfig: DynamicDialogConfig,
    private _nhanVienChamCongService: NhanVienChamCongService,
  ) {
    super(injector);
  }

  ngOnInit() {
    this.duAnId = this.dialogConfig?.data?.duAnId;
    this.chamCongId = this.dialogConfig?.data?.chamCongId;
    this.isView = this.dialogConfig?.data?.isView;
    this.sprintOptions = this.dialogConfig?.data?.sprintOptions;
    this.kieuViecOptions = this.dialogConfig?.data?.kieuViecOptions;
    this.loaiHinhOptions = this.dialogConfig?.data?.loaiHinhOptions;
    this.isEdit = this.dialogConfig?.data?.isEdit;

    const date = new Date();
    date.setDate(date.getDate() - ((date.getDay() === 1 || date.getDay() === 2) ? 4 : date.getDay() === 0 ? 3 : 2));
    this.minDateValue = date;

    this._initForm();

    if (!this.chamCongId) {
      this.formData.controls.ngayBaoCao.setValue(CommonComponent.getDateForEditFromMoment(moment(this.today)));
    } else {
      this._nhanVienChamCongService.getChamCong(this.chamCongId).subscribe((res) => {
        this.valueForEdit = res;
        if (this.valueForEdit?.sprintId) {
          this._lookupTableService.getAllModuleDuAnByCurrentUserBySprintId(res.sprintId).subscribe((tasks) => {
            this.taskOptions = tasks;
            this._lookupTableService.getAllSubtasksByCurrentUserBySprintIdAndTaskId(this.valueForEdit?.sprintId, this.valueForEdit?.taskId).subscribe((subtasks) => {
              this.subtaskOptions = subtasks;
              this.setValueForEdit();
            });
          });
        }
        if (this.isView) {
          this.formData.disable();
        }
      });
    }
  }

  _initForm() {
    this.formData = this._formBuilder.group({
      sprint: ['', Validators.required],
      task: ['', Validators.required],
      ngayBaoCao: ['', Validators.required],
      dauViec: this._formBuilder.array([]),
    });

    this.formData.controls.sprint.valueChanges.subscribe((value) => {
      if (value?.id) {
        this._lookupTableService.getAllModuleDuAnByCurrentUserBySprintId(value?.id).subscribe((tasks) => {
          this.taskOptions = tasks;
        });
        this.currentSprintId = value?.id;
      }
    });

    this.formData.controls.task.valueChanges.subscribe((value) => {
      this._lookupTableService.getAllSubtasksByCurrentUserBySprintIdAndTaskId(this.currentSprintId, value?.id).subscribe((subtasks) => {
        this.subtaskOptions = subtasks;
      });
    });
  }

  close() {
    this.dialogRef.close();
  }

  save() {
    if (CommonComponent.getControlErr(this.formData) === '') {
      this.loading = true;
      this.getValueForSave();
      if (this.isEdit) {
        this.input.chamCongId = this.chamCongId;
        this._nhanVienChamCongService.updateChamCong(this.input)
        .pipe(
          finalize(() => {
            this.loading = false;
          }),
          catchError((err) => {
            this.showErrorMessage(err.error.error.code);
            throw err;
          })
        ).subscribe((res) => {
          if (res) {
            this.showUpdateSuccessMessage('Cập nhật báo cáo chấm công thành công');
            this.dialogRef.close({ data: true });
          } else {
            this.showErrorMessage('Cập nhật báo cáo chấm công thất bại');
          }
        });
      } else {
        this._nhanVienChamCongService.createChamCong(this.input)
          .pipe(
            finalize(() => {
              this.loading = false;
            }),
            catchError((err) => {
              this.showErrorMessage(err.error.error.code);
              throw err;
            })
          ).subscribe((res) => {
            if (res) {
              this.showUpdateSuccessMessage('Báo cáo chấm công thành công');
              this.dialogRef.close({ data: true });
            } else {
              this.showErrorMessage('Báo cáo chấm công thất bại');
            }
          });
      }

    }
  }

  onTemplatedUpload() { }

  onSelectedFiles(event: any) { }

  themDauViec() {
    const control = this.formData.get('dauViec') as FormArray;
    control.push(this.addDauViec(undefined, undefined, undefined, undefined, false, 0, [], '', false));
  }

  xoaDauViec(index: number) {
    const control = this.formData.get('dauViec') as FormArray;
    control.removeAt(index);
    this.tinhTongGio();
  }

  private addDauViec(congViecId: any, subtask: any, kieuViec: any, loaiHinh: any, onSite: boolean, soGio: number, file: File[], ghiChu: string, completed = false) {
    const formControl = this._formBuilder.group({
      congViecId: [congViecId],
      subtask: [subtask, Validators.required],
      kieuViec: [kieuViec, Validators.required],
      loaiHinh: [loaiHinh, Validators.required],
      onSite: [onSite],
      soGio: [soGio, Validators.required],
      file: [file],
      ghiChu: [ghiChu],
      completed: [completed] // Add completed property here
    });

    this.subscription.add(formControl.valueChanges.subscribe((res: any) => {
      this.tinhTongGio(res);
    }));

    return formControl;
  }

  private tinhTongGio(formValue?: { soGio: any; }) {
    let tong = 0;
    tong += this.tinh(this.formData.get('dauViec')['controls'], formValue);
    tong += formValue ? formValue.soGio : 0;
    this.time = Number(tong.toFixed(2));
  }

  private tinh(formArray: any, formValue: { soGio?: any; id?: any; }) {
    let tong = 0;
    for (let form of formArray) {
      if (formValue) {
        if (form.value.id !== formValue.id) {
          tong += form.getRawValue().gio;
        }
      } else {
        tong += form.getRawValue().gio;
      }
    }
    return tong;
  }

  isCompletedBtn() {
    this.isCompleted = true;
  }

  private getValueForSave() {
    this.input.congViecs = [];
    this.input.duAnId = this.duAnId;
    this.input.sprintId = this.formData.get('sprint').value.id;
    this.input.taskId = this.formData.get('task').value.id;
    this.input.ngayChamCong = new Date(this.formData.get('ngayBaoCao').value).toISOString();
    this.input.tenTask = this.taskOptions.find(x => x.id === this.input.taskId).displayName;
    this.input.thoiGianChamCong = this.time;
    const dauViecs = {} as CongViecDto;
    dauViecs.chamCongDinhKemFiles = [];
    this.formData.get('dauViec').value.map((item: any) => {
      dauViecs.congViecId = item.congViecId;
      dauViecs.subtaskId = item.subtask.id;
      dauViecs.kieuViecId = item.kieuViec.id;
      dauViecs.loaiHinh = item.loaiHinh.id;
      dauViecs.onSite = item.onSite;
      dauViecs.soGio = item.soGio;
      dauViecs.chamCongDinhKemFiles.push(item?.file.length > 0 ? item?.file : null);
      dauViecs.ghiChu = item.ghiChu;
      dauViecs.danhDauHoanThanh = item.completed;
      this.input.congViecs.push(dauViecs);
    });
  }

  private setValueForEdit() {
    this.formData.controls.sprint.setValue(this.sprintOptions.find(x => x.id === this.valueForEdit.sprintId));
    this.formData.controls.task.setValue(this.taskOptions.find(x => x.id === this.valueForEdit.taskId));
    this.formData.controls.ngayBaoCao.setValue(CommonComponent.getDateForEditFromMoment(moment(this.valueForEdit.ngayChamCong)));
    this.valueForEdit.congViecs.map((item) => {
      const subtask = this.subtaskOptions.find(x => x.id === item.subtaskId);
      const kieuViec = this.kieuViecOptions.find(x => x.id === item.kieuViecId);
      const loaiHinh = this.loaiHinhOptions.find(x => x.id === item.loaiHinh);
      const dauViec = this.addDauViec(item.congViecId, subtask, kieuViec, loaiHinh, item.onSite, item.soGio, item.chamCongDinhKemFiles as File[], item.ghiChu, item.danhDauHoanThanh);
      const control = this.formData.get('dauViec') as FormArray;
      control.push(dauViec);
      // disable form
      if (this.isView) {
        dauViec.disable();
      }
    });
    this.time = this.valueForEdit.thoiGianChamCong;
  }

  toggleCompleted(index: number) {
    const control = (this.formData.get('dauViec') as FormArray).at(index);
    control.get('completed').setValue(true);
    // Additional logic for marking completion, e.g., sending to server
  }

}

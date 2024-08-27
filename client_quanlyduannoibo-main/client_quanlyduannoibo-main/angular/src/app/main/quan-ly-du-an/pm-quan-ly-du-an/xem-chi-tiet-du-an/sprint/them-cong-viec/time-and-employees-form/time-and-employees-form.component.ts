import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LookUpTableService } from '@proxy/global';
import { LookupTableDto } from '@proxy/global/dtos';
import { GetAllSprintListOutputDto, SubtaskInfo } from '@proxy/pm-quan-ly-du-an/dtos';
import { CommonComponent } from 'src/app/shared/validation/common.component';

@Component({
  selector: 'app-time-and-employees-form',
  templateUrl: './time-and-employees-form.component.html',
  styleUrls: ['./time-and-employees-form.component.scss']
})
export class TimeAndEmployeesFormComponent implements OnInit {

  formData: FormGroup;
  nhanSu: LookupTableDto<string>[] = [];
  @Output() timeAndEmployeesValue: EventEmitter<any> = new EventEmitter();
  @Input() subTaskId: string;
  @Input() formDataInput: any;
  @Input() subTaskInfo: SubtaskInfo[] = [];
  @Input() sprint: GetAllSprintListOutputDto;

  constructor(
    private _formBuilder: FormBuilder,
    private _lookupTableService: LookUpTableService
  ) { }

  ngOnInit() {
    this._initForm();
    this._lookupTableService.getAllNhanSu().subscribe((res) => {
      this.nhanSu = res;
      if (this.subTaskInfo) {
        this.setValueForEdit();
      }
    });
  }

  ngOnChanges() {
    if (this.formData && this.formDataInput) {
      this.formData.patchValue(this.formDataInput);
    }
  }

  _initForm() {
    this.formData = this._formBuilder.group({
      ngayBatDau: ['', Validators.required],
      ngayKetThuc: ['', Validators.required],
      nhanSu: ['', Validators.required],
    });

    this.formData.valueChanges.subscribe((res) => {
      this.timeAndEmployeesValue.emit(res);
    });

    if (this.formDataInput) {
      this.formData.patchValue(this.formDataInput);
    }

  }

  setValueForEdit() {
    if (this.subTaskInfo.length > 0) {
      this.subTaskInfo.forEach((subTask) => {
        if (subTask.subtaskId === this.subTaskId) {
          this.formData.patchValue({
            ngayBatDau: CommonComponent.getDateForEditFromMoment(subTask.thoiGianBatDau as any),
            ngayKetThuc: CommonComponent.getDateForEditFromMoment(subTask.thoiGianKetThuc as any),
            nhanSu: subTask.nhanSu,
          });
        }
      });
    }
  }

}

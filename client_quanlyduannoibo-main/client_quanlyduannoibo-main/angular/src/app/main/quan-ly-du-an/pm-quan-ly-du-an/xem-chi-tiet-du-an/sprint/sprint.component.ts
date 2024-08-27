import { Component, EventEmitter, Injector, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppComponentBase } from 'src/app/shared/app.component-base';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { GetAllSprintListOutputDto, TaskInfo } from '@proxy/pm-quan-ly-du-an/dtos';
import { CommonComponent } from 'src/app/shared/validation/common.component';
import { ThemCongViecComponent } from './them-cong-viec/them-cong-viec.component';
import { LookUpTableService } from '@proxy/global';
import { LookupTableDto } from '@proxy/global/dtos';
import { TrangThaiSubtaskConsts } from '@proxy/du-an';

@Component({
  selector: 'app-sprint',
  templateUrl: './sprint.component.html',
  styleUrls: ['./sprint.component.scss']
})
export class SprintComponent extends AppComponentBase implements OnInit {

  @Input() duAnId;
  @Input() sprintDto: any;
  @Input() isHiddenThemCongViecBtn: boolean = false;
  @Input() isThucTien: boolean = false;
  @Output() moduleInfoValueForSave: EventEmitter<any> = new EventEmitter();
  @Input() isDisableForm: boolean = false;
  taskInfo: TaskInfo[] = [];
  subTaskSelected: string[] = [];
  subTaskInfor: any[] = [];

  formData: FormGroup;
  nhanSu: LookupTableDto<"string">[];
  nhanSuNgModel: any[] = [];

  ref: DynamicDialogRef | undefined;

  constructor(
    injector: Injector,
    private _fb: FormBuilder,
    public dialogService: DialogService,
    private _lookupTableService: LookUpTableService
  ) {
    super(injector);
  }

  ngOnInit() {
    this._initForm();
    console.log('disabled', this.isDisableForm);

    if (this.sprintDto.id) {
      this._lookupTableService.getAllNhanSu().subscribe((nhanSu) => {
        this.nhanSu = nhanSu;
      });
      this.taskInfo = this.sprintDto.tasks;
      this.taskInfo.forEach((task) => {
        task.subtasks.forEach((subtask) => {
          this.subTaskSelected.push(subtask.subtaskId);
        });
      });
      this.setValueForEdit();
    }


  }

  _initForm() {
    this.formData = this._fb.group({
      tenSprint: ['', Validators.required],
      ngayBatDau: ['', Validators.required],
      ngayKetThuc: ['', Validators.required],
    });

    if (this.isDisableForm) {
      this.formData.disable();
    }
  }

  addSubtask() {
    let contentStyle = {
      overflow: 'hidden',
      padding: '16px 24px',
      borderRadius: '8px',
    };
    let width = '1534px';
    let height = '794px';
    this.ref = this.dialogService.open(ThemCongViecComponent, {
      data: { duAnId: this.duAnId, subTaskSelected: this.subTaskSelected, taskInfo: this.taskInfo, sprint: this.sprintDto },
      width: width,
      height: height,
      contentStyle: contentStyle,
      baseZIndex: 10000,
      maximizable: false,
      showHeader: false,
      dismissableMask: false, // click ra ngoài để tắt dialog
    });
    this.ref.onClose.subscribe((dataReturn) => {
      let newtaskInfoValue = {} as GetAllSprintListOutputDto;
      newtaskInfoValue = dataReturn?.data;
      if (newtaskInfoValue !== null) {
        // Cập nhật taskInfo
        this.taskInfo = newtaskInfoValue.tasks;
        this.moduleInfoValueForSave.emit({
          formData: this.formData.value,
          taskInfo: this.taskInfo
        });

        // Cập nhật subTaskSelected
        this.subTaskSelected = [];
        this.taskInfo.forEach((task) => {
          task.subtasks.forEach((subtask) => {
            this.subTaskSelected.push(subtask.subtaskId);
          });
        });
      }
    });
  }

  handleUpdateSubtaskValue(module: any, isCreate?: boolean) {
    this.subTaskSelected = isCreate ? [] : this.subTaskSelected;
    module.subTasks.forEach((subTask) => {
      this.subTaskSelected.push(subTask.subTaskId);
      this.subTaskInfor.push(subTask);
    });
  }

  private setValueForEdit() {
    this.formData.get('tenSprint')?.setValue(this.sprintDto.tenSprint);
    this.formData.get('ngayBatDau')?.setValue(CommonComponent.getDateForEditFromMoment(this.sprintDto.ngayBatDau as any));
    this.formData.get('ngayKetThuc')?.setValue(CommonComponent.getDateForEditFromMoment(this.sprintDto.ngayKetThuc as any));
  }

  handleShowStatus(status: number) {
    switch (status) {
      case TrangThaiSubtaskConsts.KhoiTao:
      case TrangThaiSubtaskConsts.ChoPheDuyetSprint:
      case TrangThaiSubtaskConsts.DaDuocPhanCong:
      case TrangThaiSubtaskConsts.ChuaHoanThanh:
      case TrangThaiSubtaskConsts.DaDuocPhanCong:
        return 'Chưa hoàn thành';
      case TrangThaiSubtaskConsts.DaHoanThanh:
        return 'Đã hoàn thành';
      default:
        return 'Quá hạn';
    }
  }

  handleStyleStatus(status: number) {
    switch (status) {
      case TrangThaiSubtaskConsts.KhoiTao:
      case TrangThaiSubtaskConsts.ChoPheDuyetSprint:
      case TrangThaiSubtaskConsts.DaDuocPhanCong:
      case TrangThaiSubtaskConsts.ChuaHoanThanh:
      case TrangThaiSubtaskConsts.DaDuocPhanCong:
        return 'warning-yellow';
      case TrangThaiSubtaskConsts.DaHoanThanh:
        return 'init-blue';
      default:
        return 'danger-red';
    }
  }

}

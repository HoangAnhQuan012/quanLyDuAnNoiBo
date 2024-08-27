import { Component, Injector, OnInit } from '@angular/core';
import { TrangThaiSubtaskConsts } from '@proxy/du-an';
import { PmQuanLyDuAnService } from '@proxy/pm-quan-ly-du-an';
import { GetAllSprintListOutputDto, ModuleSubTaskDto, SubtaskInfo, TaskInfo } from '@proxy/pm-quan-ly-du-an/dtos';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AppComponentBase } from 'src/app/shared/app.component-base';

@Component({
  selector: 'app-them-cong-viec',
  templateUrl: './them-cong-viec.component.html',
  styleUrls: ['./them-cong-viec.component.scss']
})
export class ThemCongViecComponent extends AppComponentBase implements OnInit {

  tasks: ModuleSubTaskDto[] = [];
  duAnId: string;
  disableButton = false;
  timeAndEmployeesValue: any;

  subTaskFormData = {};
  subTaskSelect: SubtaskInfo[] = [];
  subTaskSelected: string[] = [];
  taskInfoValue: TaskInfo[] = [];
  subTaskInfo: SubtaskInfo[] = [];
  sprint = {} as GetAllSprintListOutputDto;

  constructor(
    injector: Injector,
    private _pmQuanLyDuAnService: PmQuanLyDuAnService,
    private dialogConfig: DynamicDialogConfig,
    private dialogRef: DynamicDialogRef
  ) {
    super(injector);
  }

  ngOnInit() {
    this.duAnId = this.dialogConfig?.data?.duAnId;
    this.subTaskSelected = this.dialogConfig?.data?.subTaskSelected;
    this.taskInfoValue = this.dialogConfig?.data?.taskInfo;
    this.sprint = this.dialogConfig?.data?.sprint;

    this.taskInfoValue.forEach((task) => {
      task.subtasks.forEach((subtask) => {
        this.subTaskInfo.push(subtask);
      });
    });


    this._pmQuanLyDuAnService.getAllListModuleByDuAnIdByDuAnId(this.duAnId).subscribe((res) => {
      // this.tasks = res.filter((task) => task.subTasks.length > 0);
      this.tasks = res
        .filter((task) => task.subTasks.some((subTask) => subTask.trangThaiSubtask === TrangThaiSubtaskConsts.KhoiTao))
        .map((task) => ({
          ...task,
          subTasks: task.subTasks.filter((subTask) => subTask.trangThaiSubtask === TrangThaiSubtaskConsts.KhoiTao),
        }));
      this.tasks.forEach((task) => {
        task.subTasks.forEach((subTask) => {
          if (this.subTaskSelected.includes(subTask.subtaskId)) { // Nếu subtask đã được chọn thì thêm vào subTaskSelect
            this.subTaskSelect.push(subTask);
          }
        });
      });
    });
  }

  handleShowTimeAndEmployees(event: any, subTask: SubtaskInfo) {
    if (event === subTask) {
      if (!this.subTaskSelect.includes(subTask)) {
        this.subTaskSelect.push(subTask);
      }
    }
  }

  close() {
    this.dialogRef.close({ data: null });
  }

  save() {
    let sprint = {} as GetAllSprintListOutputDto;
    sprint.tasks = []; // Initialize sprint.tasks as an empty array outside the loop
    let allSubTasksValid = true;

    this.tasks.forEach((task) => {
      let taskInfo = {} as TaskInfo;
      taskInfo.tenTask = task.tenModule;
      taskInfo.taskId = task.id;
      taskInfo.tongSoGio = task.tongThoiGian;
      taskInfo.subtasks = []; // Initialize taskInfo.subtasks as an empty array

      // Check if any selected subtasks belong to the current task
      task.subTasks.forEach((taskSubTask) => {
        const subTask = this.subTaskSelect.find(st => st.subtaskId === taskSubTask.subtaskId);
        if (subTask) { // If subTask is found in subTaskSelect
          if (!this.subTaskFormData[subTask.subtaskId]?.ngayBatDau
            || !this.subTaskFormData[subTask.subtaskId]?.ngayKetThuc
            || !this.subTaskFormData[subTask.subtaskId]?.nhanSu) {
            this.showErrorMessage('Vui lòng nhập đầy đủ thông tin!');
            allSubTasksValid = false;
            return;
          }
          const subTaskInfo: SubtaskInfo = {
            subtaskId: subTask.subtaskId,
            tenSubtask: subTask.tenSubtask,
            pm: subTask.pm,
            dev: subTask.dev,
            ba: subTask.ba,
            tester: subTask.tester,
            tongSoGio: subTask.tongSoGio,
            thoiGianBatDau: this.subTaskFormData[subTask.subtaskId]?.ngayBatDau,
            thoiGianKetThuc: this.subTaskFormData[subTask.subtaskId]?.ngayKetThuc,
            nhanSu: this.subTaskFormData[subTask.subtaskId]?.nhanSu,
            trangThaiSubtask: subTask.trangThaiSubtask
          };
          taskInfo.subtasks.push(subTaskInfo);
        }
      });

      if (taskInfo.subtasks.length > 0) { // Only add the task if it has subtasks
        sprint.tasks.push(taskInfo);
      }
    });

    if (allSubTasksValid) {
      this.dialogRef.close({
        data: sprint
      })
    }
  }

  onTimeAndEmployeesValueChange(value: any, subTaskId: string) {
    // this.timeAndEmployeesValue = event;
    this.subTaskFormData[subTaskId] = value;
  }

  handleDisableCheckbox(subTaskStatus: TrangThaiSubtaskConsts) {
    if (subTaskStatus === TrangThaiSubtaskConsts.KhoiTao) {
      return false;
    }

    return true;
  }


}

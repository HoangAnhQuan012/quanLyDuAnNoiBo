import { Component, Injector, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PmQuanLyDuAnService } from '@proxy/pm-quan-ly-du-an';
import { CreateOrUpdateSprintDto, GetAllSprintListOutputDto, ModuleSubTaskDto, TaskInfo } from '@proxy/pm-quan-ly-du-an/dtos';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AppComponentBase } from 'src/app/shared/app.component-base';
import { CreateOrEditSubtaskComponent } from './create-or-edit-subtask/create-or-edit-subtask.component';
import { ConfirmDeleteComponent } from 'src/app/main/confirm-delete/confirm-delete.component';
import { CreateOrEditSprintComponent } from './create-or-edit-sprint/create-or-edit-sprint.component';
import { catchError, finalize } from 'rxjs';
import { TrangThaiSprintConsts, TrangThaiSubtaskConsts } from '@proxy/du-an';

@Component({
  selector: 'app-xem-chi-tiet-du-an',
  templateUrl: './xem-chi-tiet-du-an.component.html',
  styleUrls: ['./xem-chi-tiet-du-an.component.scss']
})
export class XemChiTietDuAnComponent extends AppComponentBase implements OnInit {

  products!: any[];
  expandedRows = {};

  DuAnModule: any[] = [];
  DuAnModuleChangeRequest: any[] = [];
  hienThiSubTask: boolean = false;
  module: any;
  tongCong: number = 0;
  modules: ModuleSubTaskDto[] = [];
  duAnId: string;
  tenDuAn: string;

  activeIndex: number = 0;

  isCreate: boolean = false;

  isShowCreateSprint: boolean = false;

  sprints: GetAllSprintListOutputDto[] = [];

  sprintsThucTien: GetAllSprintListOutputDto[] = [];

  inputForUpdateSprint = {} as CreateOrUpdateSprintDto;

  ref: DynamicDialogRef | undefined;

  guiPheDuyetLoading = false;

  disableBtnPheDuyet = true;

  constructor(
    injector: Injector,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _pmQuanLyDuAnService: PmQuanLyDuAnService,
    public dialogService: DialogService,
  ) {
    super(injector);
  }

  ngOnInit() {
    this._activatedRoute.params.subscribe((params) => {
      this.duAnId = params['id'];
    });
    this._activatedRoute.queryParams.subscribe(params => {
      this.tenDuAn = params['tenDuAn'];
    });
    this.getAllSprints();
    this.getAllModules();
    this._pmQuanLyDuAnService.getAllSprintsThucTienCuaPMByDuAnId(this.duAnId).subscribe((res) => {
      this.sprintsThucTien = res;
    });
  }

  getAllSprints() {
    this._pmQuanLyDuAnService.getAllSprints(this.duAnId).subscribe((res) => {
      this.sprints = res;
    });
  }

  getAllModules() {
    this._pmQuanLyDuAnService.getAllListModuleByDuAnIdByDuAnId(this.duAnId).subscribe((res) => {
      this.modules = res;
    });
  }

  backLine() {
    this._router.navigate(['main/quan-ly-du-an/pm-quan-ly-du-an']);
  }

  expandAll() {
    this.expandedRows = this.products.reduce((acc, p) => (acc[p.id] = true) && acc, {});
  }

  collapseAll() {
    this.expandedRows = {};
  }

  getSeverity(status: string) {
    switch (status) {
      case 'INSTOCK':
        return 'success';
      case 'LOWSTOCK':
        return 'warning';
      case 'OUTOFSTOCK':
        return 'danger';
    }
  }

  getStatusSeverity(status: string) {
    switch (status) {
      case 'PENDING':
        return 'warning';
      case 'DELIVERED':
        return 'success';
      case 'CANCELLED':
        return 'danger';
    }
  }

  save() {
    this._pmQuanLyDuAnService.updateSprint(this.inputForUpdateSprint)
      .pipe(
        finalize(() => { }),
        catchError((err) => {
          this.showErrorMessage(err.message);
          throw err;
        })
      )
      .subscribe((res) => {
        this.showUpdateSuccessMessage('Cập nhật thành công');
        this.getAllSprints();
      });
  }

  onSaveSprintValue(value: any, sprintId: string) {
    this.inputForUpdateSprint.sprintId = sprintId;
    this.inputForUpdateSprint.duAnId = this.duAnId;
    this.inputForUpdateSprint.tenSprint = value.formData.tenSprint;
    this.inputForUpdateSprint.ngayBatDau = value.formData.ngayBatDau;
    this.inputForUpdateSprint.ngayKetThuc = value.formData.ngayKetThuc;
    this.inputForUpdateSprint.subtasks = value.taskInfo?.flatMap(task =>
      task.subtasks?.map(subtask => ({
        subtaskId: subtask.subtaskId,
        thoiGianBatDau: subtask.thoiGianBatDau,
        thoiGianKetThuc: subtask.thoiGianKetThuc,
        nhanSu: subtask.nhanSu,
      })
      ) || []
    ) || [];

    // if exist trangThaiSubtask !== TrangThaiSubtaskConsts.KhoiTao => disable button
    this.disableBtnPheDuyet = value.taskInfo?.flatMap(task =>
      task.subtasks?.map(subtask =>
        subtask.trangThaiSubtask === TrangThaiSubtaskConsts.KhoiTao
      )
    ).includes(true);
    this.disableBtnPheDuyet = !this.disableBtnPheDuyet;
    console.log('disableBtnPheDuyet', this.disableBtnPheDuyet);

  }

  createOrEditChangeRequest() { }

  themSubtask(modulId: string) {
    let contentStyle = {
      overflow: 'hidden',
      padding: '16px 24px',
      borderRadius: '8px',
    };
    let width = '1100px';
    let height = '286px';
    this.ref = this.dialogService.open(CreateOrEditSubtaskComponent, {
      data: { moduleId: modulId },
      width: width,
      height: height,
      contentStyle: contentStyle,
      baseZIndex: 10000,
      maximizable: false,
      showHeader: false,
      dismissableMask: false, // click ra ngoài để tắt dialog
    });
    this.ref.onClose.subscribe((dataReturn) => {
      if (dataReturn.data) {
        this.getAllModules();
      }
    });
  }

  kiemTraLogwork() { }

  xoaSubtask(subTaskId: string, subTaskName: string) {
    let contentStyle = {
      overflow: 'hidden',
      padding: '39px 32px 16px',
      borderRadius: '20px',
    };
    let width = '400px';
    let height = '225px';
    this.ref = this.dialogService.open(ConfirmDeleteComponent, {
      data: { title: 'subtask' },
      width: width,
      height: height,
      contentStyle: contentStyle,
      baseZIndex: 10000,
      maximizable: false,
      showHeader: false,
    });
    this.ref.onClose.subscribe((dataReturn) => {
      if (dataReturn.data) {
        this._pmQuanLyDuAnService.deleteSubTaskBySubTaskId(subTaskId).subscribe(() => {
          this.showDeleteSuccessMessage('Xóa thành công!');
          this.getAllSprints();
        });
      }
    });
  }

  getAllMandayLeft(moduleId: string, subtaskId?: string) {
    this._pmQuanLyDuAnService.getAllMandayLeftByModuleIdAndSubTaskId(moduleId, subtaskId).subscribe((res) => {
      // Update value for modules
      this.modules.forEach((module) => {
        if (module.id === moduleId) {
          module.pm = res.pm;
          module.dev = res.dev;
          module.test = res.test;
          module.ba = res.ba;
        }
      });
    });
  }

  editSubTask(moduleId, subTaskId) {
    let contentStyle = {
      overflow: 'hidden',
      padding: '16px 24px',
      borderRadius: '8px',
    };
    let width = '1100px';
    let height = '286px';
    this.ref = this.dialogService.open(CreateOrEditSubtaskComponent, {
      data: { moduleId: moduleId, subTaskId: subTaskId, isEdit: true },
      width: width,
      height: height,
      contentStyle: contentStyle,
      baseZIndex: 10000,
      maximizable: false,
      showHeader: false,
      dismissableMask: false, // click ra ngoài để tắt dialog
    });
    this.ref.onClose.subscribe((dataReturn) => {
      if (dataReturn.data) {
        this.getAllSprints();
      }
    });
  }

  addSprint() {
    // this.isShowCreateSprint = true;
    let contentStyle = {
      overflow: 'hidden',
      padding: '16px 24px',
      borderRadius: '8px',
    };
    let width = '1528px';
    let height = '334px';
    this.ref = this.dialogService.open(CreateOrEditSprintComponent, {
      data: { duAnId: this.duAnId },
      width: width,
      height: height,
      contentStyle: contentStyle,
      baseZIndex: 10000,
      maximizable: false,
      showHeader: false,
      dismissableMask: false, // click ra ngoài để tắt dialog
    });
    this.ref.onClose.subscribe((dataReturn) => {
      if (dataReturn.data) {
        this.getAllSprints();
      }
    });
  }

  GuiPheDuyet(sprintId: string) {
    this.guiPheDuyetLoading = true;
    this._pmQuanLyDuAnService.sendAcceptSprintToBoDBySprintId(sprintId)
      .pipe(
        finalize(() => {
          this.guiPheDuyetLoading = false;
        })
      )
      .subscribe(() => {
        this.showUpdateSuccessMessage('Gửi phê duyệt thành công');
        this.getAllSprints();
      });
  }

  handleDisablePheDuyet(trangThaiSprint: TrangThaiSprintConsts, tasks: TaskInfo[]) {
    let disable = false;
    if (tasks.length > 0) {
      disable = tasks?.filter(task => task.subtasks?.filter(subtask =>
        subtask.trangThaiSubtask === TrangThaiSubtaskConsts.KhoiTao).length > 0).length > 0;
      return !disable;
    } else {
      if (trangThaiSprint === TrangThaiSprintConsts.KhoiTao
        || trangThaiSprint === TrangThaiSprintConsts.ChuaGuiPheDuyet) {
        return false;
      }

      return true;
    }
  }

}

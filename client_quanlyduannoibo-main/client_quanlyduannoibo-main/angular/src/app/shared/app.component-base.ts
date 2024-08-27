import { AuthService, ConfigStateService, LocalizationService, PermissionService } from '@abp/ng.core';
import { Injector } from '@angular/core';
import { ThoiHanLoaiHopDongConst } from '@proxy/danh-muc';
import * as moment from 'moment';
import { LazyLoadEvent, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';

export abstract class AppComponentBase {
  localizationService: LocalizationService;
  messageService: MessageService;
  authService: AuthService;
  configStateService: ConfigStateService;
  permission: PermissionService;
  serverUrl = '';
  baseUrl = '';
  rowPerPageOptions = [10, 20, 50, 100, 200, 500];
  timeFormatInsert = 'HH:mm';
  today = new Date();

  subscription: Subscription = new Subscription();

  constructor(
    injector: Injector
  ) {
    this.localizationService = injector.get(LocalizationService);
    this.messageService = injector.get(MessageService);
    this.authService = injector.get(AuthService);
    this.configStateService = injector.get(ConfigStateService);
    this.serverUrl = environment.apis.default.url;
    this.baseUrl = environment.application.baseUrl;
  }

  get hasLoggedIn(): boolean {
    return this.authService.isAuthenticated;
  }

  isGranted(permissionName: string): boolean {
    return this.permission.getGrantedPolicy(permissionName);
  }


  getCurrentUser() {
    return this.configStateService.getOne('currentUser');
  }

  showCreateSuccessMessage(message: string) {
    this.showSuccessMessage(message);
  }

  showUpdateSuccessMessage(message: string) {
    this.showSuccessMessage(message);
  }

  showDeleteSuccessMessage(message: string) {
    this.showSuccessMessage(message);
  }

  showSuccessMessage(message: string) {
    this.messageService.clear('tms');
    this.messageService.add({
      key: 'tms',
      severity: 'success',
      summary: 'Thành công',
      detail: message,
    });
  }

  showInfoMessage(message: string) {
    this.messageService.clear('tms');
    this.messageService.add({
      key: 'tms',
      severity: 'info',
      summary: 'Thông tin',
      detail: message,
    });
  }

  showWarningMessage(message: string) {
    this.messageService.clear('tms');
    this.messageService.add({
      key: 'tms',
      severity: 'warn',
      summary: 'Cảnh báo',
      detail: message,
    });
  }

  showErrorMessage(message: string) {
    this.messageService.clear('tms');
    this.messageService.add({
      key: 'tms',
      severity: 'error',
      summary: 'Lỗi',
      detail: message,
    });
  }

  L(key: string) {
    return this.localizationService.instant(key);
  }

  handlerError(err, message?: string) {
    if (err.status != 500) {
      this.showErrorMessage(message ? message : err.error.error.message);
    }
  }

  getSortField(table?: Table): string {
    if (table && table?.sortField) {
      return table.sortField + (table.sortOrder === 1 ? ' asc' : ' desc');
    }
    return undefined;
  }

  getSkipCount(lazyLoad?: LazyLoadEvent, table?: Table) {
    if (lazyLoad) {
      return lazyLoad?.first;
    }
    return table?.first;
  }

  getMaxResultCount(lazyLoad?: LazyLoadEvent, table?: Table) {
    if (lazyLoad) {
      return lazyLoad?.rows;
    }
    return table?.rows;
  }

  getThoiHanHopDong(thoihanHopDong: ThoiHanLoaiHopDongConst) {
    switch (thoihanHopDong) {
      case ThoiHanLoaiHopDongConst.HaiNam:
        return '2 năm';
      case ThoiHanLoaiHopDongConst.HaiThang:
        return '2 tháng';
      case ThoiHanLoaiHopDongConst.MotNam:
        return '1 năm';
      case ThoiHanLoaiHopDongConst.VoThoiHan:
        return 'Vô thời hạn';
      default:
        return '';
    }
  }

  public static getDateForEditFromMoment(date: moment.Moment, format = 'YYYY/MM/DD') {
    return date ? new Date(moment(date).format(format)) : null;
  }

}

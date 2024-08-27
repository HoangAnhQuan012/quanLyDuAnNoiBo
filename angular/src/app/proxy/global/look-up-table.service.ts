import type { LookupTableDto, LookupTableIntDto } from './dtos/models';
import { RestService, Rest } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LookUpTableService {
  apiName = 'Default';
  

  getAllKhachHang = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, LookupTableDto<string>>({
      method: 'GET',
      url: '/api/app/look-up-table/khach-hang',
    },
    { apiName: this.apiName,...config });
  

  getAllKieuViec = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, LookupTableDto[]>({
      method: 'GET',
      url: '/api/app/look-up-table/kieu-viec',
    },
    { apiName: this.apiName,...config });
  

  getAllLoaiHinhCongViec = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, LookupTableIntDto[]>({
      method: 'GET',
      url: '/api/app/look-up-table/loai-hinh-cong-viec',
    },
    { apiName: this.apiName,...config });
  

  getAllModuleDuAnByCurrentUserBySprintId = (sprintId: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, LookupTableDto[]>({
      method: 'GET',
      url: `/api/app/look-up-table/module-du-an-by-current-user/${sprintId}`,
    },
    { apiName: this.apiName,...config });
  

  getAllNhanSu = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, LookupTableDto[]>({
      method: 'GET',
      url: '/api/app/look-up-table/nhan-su',
    },
    { apiName: this.apiName,...config });
  

  getAllQuanLyDuAn = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, LookupTableDto[]>({
      method: 'GET',
      url: '/api/app/look-up-table/quan-ly-du-an',
    },
    { apiName: this.apiName,...config });
  

  getAllSprintDuAnByCurrentUserByDuAnId = (DuAnId: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, LookupTableDto[]>({
      method: 'GET',
      url: `/api/app/look-up-table/sprint-du-an-by-current-user/${DuAnId}`,
    },
    { apiName: this.apiName,...config });
  

  getAllSubtasksByCurrentUserBySprintIdAndTaskId = (sprintId: string, taskId: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, LookupTableDto[]>({
      method: 'GET',
      url: '/api/app/look-up-table/subtasks-by-current-user',
      params: { sprintId, taskId },
    },
    { apiName: this.apiName,...config });
  

  getAllTrangThaiDuAn = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, LookupTableIntDto[]>({
      method: 'GET',
      url: '/api/app/look-up-table/trang-thai-du-an',
    },
    { apiName: this.apiName,...config });
  

  getCurrentUsername = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, string>({
      method: 'GET',
      responseType: 'text',
      url: '/api/app/look-up-table/current-username',
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}

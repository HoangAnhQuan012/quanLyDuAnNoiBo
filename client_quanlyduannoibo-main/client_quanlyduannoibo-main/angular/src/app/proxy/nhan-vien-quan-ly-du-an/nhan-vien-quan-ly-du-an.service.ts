import { RestService, Rest } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { GetAllDuAnDto, GetAllDuAnInputDto } from '../bo-dquan-ly-du-an/dtos/models';
import type { GetAllSprintListOutputDto } from '../pm-quan-ly-du-an/dtos/models';

@Injectable({
  providedIn: 'root',
})
export class NhanVienQuanLyDuAnService {
  apiName = 'Default';
  

  getAllDuAnByInput = (input: GetAllDuAnInputDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<GetAllDuAnDto>>({
      method: 'GET',
      url: '/api/app/nhan-vien-quan-ly-du-an/du-an',
      params: { keyword: input.keyword, khachHang: input.khachHang, trangThai: input.trangThai, quanLyDuAnId: input.quanLyDuAnId, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  getAllSprintsKeHoach = (duAnId: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, GetAllSprintListOutputDto[]>({
      method: 'GET',
      url: `/api/app/nhan-vien-quan-ly-du-an/sprints-ke-hoach/${duAnId}`,
    },
    { apiName: this.apiName,...config });
  

  getAllSprintsThucTienByDuAnId = (duAnId: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, GetAllSprintListOutputDto[]>({
      method: 'GET',
      url: `/api/app/nhan-vien-quan-ly-du-an/sprints-thuc-tien/${duAnId}`,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}

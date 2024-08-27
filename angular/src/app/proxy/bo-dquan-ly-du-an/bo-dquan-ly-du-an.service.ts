import type { CreateDuAnDto, GetAllDuAnDto, GetAllDuAnInputDto, GetDuAnDto, UpdateDuAnDto } from './dtos/models';
import { RestService, Rest } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { TrangThaiDuAnConsts } from '../du-an/trang-thai-du-an-consts.enum';
import type { GetAllSprintListOutputDto } from '../pm-quan-ly-du-an/dtos/models';

@Injectable({
  providedIn: 'root',
})
export class BoDQuanLyDuAnService {
  apiName = 'Default';
  

  acceptSprintBySprintId = (sprintId: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, boolean>({
      method: 'POST',
      url: `/api/app/bo-dQuan-ly-du-an/accept-sprint/${sprintId}`,
    },
    { apiName: this.apiName,...config });
  

  createDuAn = (input: CreateDuAnDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, boolean>({
      method: 'POST',
      url: '/api/app/bo-dQuan-ly-du-an/du-an',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  deleteDuAn = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, boolean>({
      method: 'DELETE',
      url: `/api/app/bo-dQuan-ly-du-an/${id}/du-an`,
    },
    { apiName: this.apiName,...config });
  

  getAll = (input: GetAllDuAnInputDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<GetAllDuAnDto>>({
      method: 'GET',
      url: '/api/app/bo-dQuan-ly-du-an',
      params: { keyword: input.keyword, khachHang: input.khachHang, trangThai: input.trangThai, quanLyDuAnId: input.quanLyDuAnId, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  getAllSprintsPheDuyetVaChuaPheDuyet = (duAnId: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, GetAllSprintListOutputDto[]>({
      method: 'GET',
      url: `/api/app/bo-dQuan-ly-du-an/sprints-phe-duyet-va-chua-phe-duyet/${duAnId}`,
    },
    { apiName: this.apiName,...config });
  

  getDuAnById = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, GetDuAnDto>({
      method: 'GET',
      url: `/api/app/bo-dQuan-ly-du-an/${id}/du-an-by-id`,
    },
    { apiName: this.apiName,...config });
  

  thayDoiTrangThaiDuAnByIdAndTrangThai = (id: string, trangThai: TrangThaiDuAnConsts, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: `/api/app/bo-dQuan-ly-du-an/${id}/thay-doi-trang-thai-du-an`,
      params: { trangThai },
    },
    { apiName: this.apiName,...config });
  

  updateDuAn = (input: UpdateDuAnDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, boolean>({
      method: 'PUT',
      url: '/api/app/bo-dQuan-ly-du-an/du-an',
      body: input,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}

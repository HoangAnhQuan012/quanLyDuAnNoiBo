import type { ChucDanhDto, GetAllInputChucDanhDto } from './dtos/models';
import { RestService, Rest } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { LookupTableDto } from '../global/dtos/models';

@Injectable({
  providedIn: 'root',
})
export class ChucDanhService {
  apiName = 'Default';
  

  createChucDanhByInput = (input: ChucDanhDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, boolean>({
      method: 'POST',
      url: '/api/app/chuc-danh/chuc-danh',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  deleteChucDanhById = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, boolean>({
      method: 'DELETE',
      url: `/api/app/chuc-danh/${id}/chuc-danh`,
    },
    { apiName: this.apiName,...config });
  

  getAll = (input: GetAllInputChucDanhDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<ChucDanhDto>>({
      method: 'GET',
      url: '/api/app/chuc-danh',
      params: { keyword: input.keyword, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  getAllChucDanh = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, ChucDanhDto[]>({
      method: 'GET',
      url: '/api/app/chuc-danh/chuc-danh',
    },
    { apiName: this.apiName,...config });
  

  getAllChucDanhLookupTable = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, LookupTableDto[]>({
      method: 'GET',
      url: '/api/app/chuc-danh/chuc-danh-lookup-table',
    },
    { apiName: this.apiName,...config });
  

  getChucDanhByIdById = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ChucDanhDto>({
      method: 'GET',
      url: `/api/app/chuc-danh/${id}/chuc-danh-by-id`,
    },
    { apiName: this.apiName,...config });
  

  updateChucDanhByInput = (input: ChucDanhDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, boolean>({
      method: 'PUT',
      url: '/api/app/chuc-danh/chuc-danh',
      body: input,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}

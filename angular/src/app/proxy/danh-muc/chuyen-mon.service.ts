import type { ChuyenMonDto, GetAllInputChuyenMonDto } from './dtos/models';
import { RestService, Rest } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { LookupTableDto } from '../global/dtos/models';

@Injectable({
  providedIn: 'root',
})
export class ChuyenMonService {
  apiName = 'Default';
  

  createChuyenMonByInput = (input: ChuyenMonDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, boolean>({
      method: 'POST',
      url: '/api/app/chuyen-mon/chuyen-mon',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  deleteChuyenMonById = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, boolean>({
      method: 'DELETE',
      url: `/api/app/chuyen-mon/${id}/chuyen-mon`,
    },
    { apiName: this.apiName,...config });
  

  getAllChuyenMonByInput = (input: GetAllInputChuyenMonDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<ChuyenMonDto>>({
      method: 'GET',
      url: '/api/app/chuyen-mon/chuyen-mon',
      params: { keyword: input.keyword, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  getAllChuyenMonLookupTable = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, LookupTableDto[]>({
      method: 'GET',
      url: '/api/app/chuyen-mon/chuyen-mon-lookup-table',
    },
    { apiName: this.apiName,...config });
  

  getChuyenMonByIdById = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ChuyenMonDto>({
      method: 'GET',
      url: `/api/app/chuyen-mon/${id}/chuyen-mon-by-id`,
    },
    { apiName: this.apiName,...config });
  

  updateChuyenMonByInput = (input: ChuyenMonDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, boolean>({
      method: 'PUT',
      url: '/api/app/chuyen-mon/chuyen-mon',
      body: input,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}

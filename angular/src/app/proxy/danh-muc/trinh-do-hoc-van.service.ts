import type { GetAllInputTrinhDoHocVanDto, TrinhDoHocVanDto } from './dtos/models';
import { RestService, Rest } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TrinhDoHocVanService {
  apiName = 'Default';
  

  createTrinhDoHocVanByInput = (input: TrinhDoHocVanDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, boolean>({
      method: 'POST',
      url: '/api/app/trinh-do-hoc-van/trinh-do-hoc-van',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  deleteTrinhDoHocVanById = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, boolean>({
      method: 'DELETE',
      url: `/api/app/trinh-do-hoc-van/${id}/trinh-do-hoc-van`,
    },
    { apiName: this.apiName,...config });
  

  getAll = (input: GetAllInputTrinhDoHocVanDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<TrinhDoHocVanDto>>({
      method: 'GET',
      url: '/api/app/trinh-do-hoc-van',
      params: { keyword: input.keyword, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  getAllTrinhDoHocVan = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, TrinhDoHocVanDto[]>({
      method: 'GET',
      url: '/api/app/trinh-do-hoc-van/trinh-do-hoc-van',
    },
    { apiName: this.apiName,...config });
  

  getTrinhDoHocVanByIdById = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, TrinhDoHocVanDto>({
      method: 'GET',
      url: `/api/app/trinh-do-hoc-van/${id}/trinh-do-hoc-van-by-id`,
    },
    { apiName: this.apiName,...config });
  

  updateTrinhDoHocVanByInput = (input: TrinhDoHocVanDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, boolean>({
      method: 'PUT',
      url: '/api/app/trinh-do-hoc-van/trinh-do-hoc-van',
      body: input,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}

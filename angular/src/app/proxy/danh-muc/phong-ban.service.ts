import type { GetAllInputPhongBanDto, PhongBanDto } from './dtos/models';
import { RestService, Rest } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PhongBanService {
  apiName = 'Default';
  

  createPhongBanByInput = (input: PhongBanDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, boolean>({
      method: 'POST',
      url: '/api/app/phong-ban/phong-ban',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  deletePhongBanById = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, boolean>({
      method: 'DELETE',
      url: `/api/app/phong-ban/${id}/phong-ban`,
    },
    { apiName: this.apiName,...config });
  

  getAllPhongBanByInput = (input: GetAllInputPhongBanDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<PhongBanDto>>({
      method: 'GET',
      url: '/api/app/phong-ban/phong-ban',
      params: { keyword: input.keyword, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  getPhongBanByIdById = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PhongBanDto>({
      method: 'GET',
      url: `/api/app/phong-ban/${id}/phong-ban-by-id`,
    },
    { apiName: this.apiName,...config });
  

  updatePhongBanByInput = (input: PhongBanDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, boolean>({
      method: 'PUT',
      url: '/api/app/phong-ban/phong-ban',
      body: input,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}

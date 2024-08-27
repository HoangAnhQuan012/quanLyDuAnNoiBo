import type { CaLamViecDto, GetAllInputCaLamViecDto } from './dtos/models';
import { RestService, Rest } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CaLamViecService {
  apiName = 'Default';
  

  createCaLamViecByInput = (input: CaLamViecDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, boolean>({
      method: 'POST',
      url: '/api/app/ca-lam-viec/ca-lam-viec',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  deleteCaLamViecById = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, boolean>({
      method: 'DELETE',
      url: `/api/app/ca-lam-viec/${id}/ca-lam-viec`,
    },
    { apiName: this.apiName,...config });
  

  getAll = (input: GetAllInputCaLamViecDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<CaLamViecDto>>({
      method: 'GET',
      url: '/api/app/ca-lam-viec',
      params: { keyword: input.keyword, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  getAllCaLamViec = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, CaLamViecDto[]>({
      method: 'GET',
      url: '/api/app/ca-lam-viec/ca-lam-viec',
    },
    { apiName: this.apiName,...config });
  

  getCaLamViecByIdById = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, CaLamViecDto>({
      method: 'GET',
      url: `/api/app/ca-lam-viec/${id}/ca-lam-viec-by-id`,
    },
    { apiName: this.apiName,...config });
  

  updateCaLamViecByInput = (input: CaLamViecDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, boolean>({
      method: 'PUT',
      url: '/api/app/ca-lam-viec/ca-lam-viec',
      body: input,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}

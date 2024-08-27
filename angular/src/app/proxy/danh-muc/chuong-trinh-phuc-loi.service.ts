import type { ChuongTrinhPhucLoiDto, GetAllInputChuongTrinhPhucLoiDto } from './dtos/models';
import { RestService, Rest } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ChuongTrinhPhucLoiService {
  apiName = 'Default';
  

  createChuongTrinhPhucLoiByInput = (input: ChuongTrinhPhucLoiDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, boolean>({
      method: 'POST',
      url: '/api/app/chuong-trinh-phuc-loi/chuong-trinh-phuc-loi',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  deleteChuongTrinhPhucLoiById = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, boolean>({
      method: 'DELETE',
      url: `/api/app/chuong-trinh-phuc-loi/${id}/chuong-trinh-phuc-loi`,
    },
    { apiName: this.apiName,...config });
  

  getAll = (input: GetAllInputChuongTrinhPhucLoiDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<ChuongTrinhPhucLoiDto>>({
      method: 'GET',
      url: '/api/app/chuong-trinh-phuc-loi',
      params: { keyword: input.keyword, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  getAllChuongTrinhPhucLoi = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, ChuongTrinhPhucLoiDto[]>({
      method: 'GET',
      url: '/api/app/chuong-trinh-phuc-loi/chuong-trinh-phuc-loi',
    },
    { apiName: this.apiName,...config });
  

  getChuongTrinhPhucLoiByIdById = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ChuongTrinhPhucLoiDto>({
      method: 'GET',
      url: `/api/app/chuong-trinh-phuc-loi/${id}/chuong-trinh-phuc-loi-by-id`,
    },
    { apiName: this.apiName,...config });
  

  updateChuongTrinhPhucLoiByInput = (input: ChuongTrinhPhucLoiDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, boolean>({
      method: 'PUT',
      url: '/api/app/chuong-trinh-phuc-loi/chuong-trinh-phuc-loi',
      body: input,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}

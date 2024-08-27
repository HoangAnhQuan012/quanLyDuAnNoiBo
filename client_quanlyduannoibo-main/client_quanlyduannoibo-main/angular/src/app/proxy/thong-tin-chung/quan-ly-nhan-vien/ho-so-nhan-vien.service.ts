import type { GetAllInputHoSoNhanVienDto, HoSoNhanVienDto } from './dtos/models';
import { RestService, Rest } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { LookupTableDto } from '../../global/dtos/models';

@Injectable({
  providedIn: 'root',
})
export class HoSoNhanVienService {
  apiName = 'Default';
  

  createHoSoNhanVien = (input: HoSoNhanVienDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, boolean>({
      method: 'POST',
      url: '/api/app/ho-so-nhan-vien/ho-so-nhan-vien',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  deleteHoSoNhanVien = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, boolean>({
      method: 'DELETE',
      url: `/api/app/ho-so-nhan-vien/${id}/ho-so-nhan-vien`,
    },
    { apiName: this.apiName,...config });
  

  getAll = (input: GetAllInputHoSoNhanVienDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<HoSoNhanVienDto>>({
      method: 'GET',
      url: '/api/app/ho-so-nhan-vien',
      params: { keyword: input.keyword, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  getAllCaLamViec = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, LookupTableDto[]>({
      method: 'GET',
      url: '/api/app/ho-so-nhan-vien/ca-lam-viec',
    },
    { apiName: this.apiName,...config });
  

  getAllChucDanh = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, LookupTableDto[]>({
      method: 'GET',
      url: '/api/app/ho-so-nhan-vien/chuc-danh',
    },
    { apiName: this.apiName,...config });
  

  getAllDanToc = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, LookupTableDto[]>({
      method: 'GET',
      url: '/api/app/ho-so-nhan-vien/dan-toc',
    },
    { apiName: this.apiName,...config });
  

  getAllHoSoNhanVien = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, HoSoNhanVienDto[]>({
      method: 'GET',
      url: '/api/app/ho-so-nhan-vien/ho-so-nhan-vien',
    },
    { apiName: this.apiName,...config });
  

  getAllPhongBan = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, LookupTableDto[]>({
      method: 'GET',
      url: '/api/app/ho-so-nhan-vien/phong-ban',
    },
    { apiName: this.apiName,...config });
  

  getAllUser = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, LookupTableDto[]>({
      method: 'GET',
      url: '/api/app/ho-so-nhan-vien/user',
    },
    { apiName: this.apiName,...config });
  

  getHoSoNhanVienById = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, HoSoNhanVienDto>({
      method: 'GET',
      url: `/api/app/ho-so-nhan-vien/${id}/ho-so-nhan-vien-by-id`,
    },
    { apiName: this.apiName,...config });
  

  updateHoSoNhanVien = (input: HoSoNhanVienDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, boolean>({
      method: 'PUT',
      url: '/api/app/ho-so-nhan-vien/ho-so-nhan-vien',
      body: input,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}

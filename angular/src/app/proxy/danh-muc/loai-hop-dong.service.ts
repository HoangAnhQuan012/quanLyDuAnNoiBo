import type { GetAllInputLoaiHopDongDto, LoaiHopDongDto } from './dtos/models';
import { RestService, Rest } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoaiHopDongService {
  apiName = 'Default';
  

  createLoaiHopDongByInput = (input: LoaiHopDongDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, boolean>({
      method: 'POST',
      url: '/api/app/loai-hop-dong/loai-hop-dong',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  deleteLoaiHopDongById = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, boolean>({
      method: 'DELETE',
      url: `/api/app/loai-hop-dong/${id}/loai-hop-dong`,
    },
    { apiName: this.apiName,...config });
  

  getAll = (input: GetAllInputLoaiHopDongDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<LoaiHopDongDto>>({
      method: 'GET',
      url: '/api/app/loai-hop-dong',
      params: { keyword: input.keyword, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  getAllLoaiHopDong = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, LoaiHopDongDto[]>({
      method: 'GET',
      url: '/api/app/loai-hop-dong/loai-hop-dong',
    },
    { apiName: this.apiName,...config });
  

  getLoaiHopDongByIdById = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, LoaiHopDongDto>({
      method: 'GET',
      url: `/api/app/loai-hop-dong/${id}/loai-hop-dong-by-id`,
    },
    { apiName: this.apiName,...config });
  

  updateLoaiHopDongByInput = (input: LoaiHopDongDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, boolean>({
      method: 'PUT',
      url: '/api/app/loai-hop-dong/loai-hop-dong',
      body: input,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}

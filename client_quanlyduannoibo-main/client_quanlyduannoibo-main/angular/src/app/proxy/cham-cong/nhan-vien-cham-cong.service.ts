import type { CreateOrUpdateChamCongInputDto, GetAllChamCongInputDto, GetAllChamCongListOutput, GetAllDuAnChamCongDto, GetAllDuAnChamCongInput } from './dtos/models';
import type { TrangThaiChamCongConsts } from './trang-thai-cham-cong-consts.enum';
import { RestService, Rest } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NhanVienChamCongService {
  apiName = 'Default';
  

  createChamCong = (input: CreateOrUpdateChamCongInputDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, boolean>({
      method: 'POST',
      url: '/api/app/nhan-vien-cham-cong/cham-cong',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  deleteChamCongByChamCongId = (chamCongId: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/nhan-vien-cham-cong/cham-cong/${chamCongId}`,
    },
    { apiName: this.apiName,...config });
  

  getAllChamCongByDuAnIdByInput = (input: GetAllChamCongInputDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<GetAllChamCongListOutput>>({
      method: 'GET',
      url: '/api/app/nhan-vien-cham-cong/cham-cong-by-du-an-id',
      params: { duAnId: input.duAnId, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  getAllDuAnChamCongByInput = (input: GetAllDuAnChamCongInput, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<GetAllDuAnChamCongDto>>({
      method: 'GET',
      url: '/api/app/nhan-vien-cham-cong/du-an-cham-cong',
      params: { keyword: input.keyword, khachHang: input.khachHang, trangThai: input.trangThai, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  getChamCong = (chamCongId: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, CreateOrUpdateChamCongInputDto>({
      method: 'GET',
      url: `/api/app/nhan-vien-cham-cong/cham-cong/${chamCongId}`,
    },
    { apiName: this.apiName,...config });
  

  guiPheDuyetByChamCongId = (chamCongId: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: `/api/app/nhan-vien-cham-cong/gui-phe-duyet/${chamCongId}`,
    },
    { apiName: this.apiName,...config });
  

  updateChamCong = (input: CreateOrUpdateChamCongInputDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, boolean>({
      method: 'PUT',
      url: '/api/app/nhan-vien-cham-cong/cham-cong',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  updateTrangThaiChamCongByChamCongIdAndTrangThaiChamCong = (chamCongId: string, trangThaiChamCong: TrangThaiChamCongConsts, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'PUT',
      url: `/api/app/nhan-vien-cham-cong/trang-thai-cham-cong/${chamCongId}`,
      params: { trangThaiChamCong },
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}

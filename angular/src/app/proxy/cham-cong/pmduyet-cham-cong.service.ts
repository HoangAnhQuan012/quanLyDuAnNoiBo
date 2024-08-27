import type { DuyetChamCongDanhSachNhanVien, DuyetChamCongListInputDto, GetAllDuAnPMDuyetChamCongOutputDto, GetAllPMDuyetChamCongInputDto, GetListChamCongByDuAnIdInputDto, GetListChamCongByDuAnIdOutputDto, GetThongTinChamCongChiTietOutputDto } from './dtos/models';
import { RestService, Rest } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PMDuyetChamCongService {
  apiName = 'Default';
  

  duyetChamCongChiTietByInput = (input: DuyetChamCongListInputDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, boolean>({
      method: 'POST',
      url: '/api/app/p-mDuyet-cham-cong/duyet-cham-cong-chi-tiet',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  duyetChamCongTheoDanhSachNVByInput = (input: DuyetChamCongDanhSachNhanVien, config?: Partial<Rest.Config>) =>
    this.restService.request<any, boolean>({
      method: 'POST',
      url: '/api/app/p-mDuyet-cham-cong/duyet-cham-cong-theo-danh-sach-nV',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  getAllDuAnPMDuyetChamCongByInput = (input: GetAllPMDuyetChamCongInputDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<GetAllDuAnPMDuyetChamCongOutputDto>>({
      method: 'GET',
      url: '/api/app/p-mDuyet-cham-cong/du-an-pMDuyet-cham-cong',
      params: { keyword: input.keyword, startTime: input.startTime, endTime: input.endTime, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  getListChamCongByDuAnIdByInput = (input: GetListChamCongByDuAnIdInputDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<GetListChamCongByDuAnIdOutputDto>>({
      method: 'GET',
      url: '/api/app/p-mDuyet-cham-cong/cham-cong-by-du-an-id',
      params: { keyword: input.keyword, duAnId: input.duAnId, startTime: input.startTime, endTime: input.endTime, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  getThongTinChamCongChiTietByNhanVienIdAndNgayChamCong = (nhanVienId: string, ngayChamCong: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, GetThongTinChamCongChiTietOutputDto[]>({
      method: 'GET',
      url: `/api/app/p-mDuyet-cham-cong/thong-tin-cham-cong-chi-tiet/${nhanVienId}`,
      params: { ngayChamCong },
    },
    { apiName: this.apiName,...config });
  

  tuChoiChamCongChiTietByInput = (input: DuyetChamCongListInputDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, boolean>({
      method: 'POST',
      url: '/api/app/p-mDuyet-cham-cong/tu-choi-cham-cong-chi-tiet',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  tuChoiChamCongTheoDanhSachNVByInput = (input: DuyetChamCongDanhSachNhanVien, config?: Partial<Rest.Config>) =>
    this.restService.request<any, boolean>({
      method: 'POST',
      url: '/api/app/p-mDuyet-cham-cong/tu-choi-cham-cong-theo-danh-sach-nV',
      body: input,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}

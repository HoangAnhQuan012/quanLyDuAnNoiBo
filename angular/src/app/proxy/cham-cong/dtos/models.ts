import type { LoaiHinhConsts } from '../../cong-viec/loai-hinh-consts.enum';
import type { TrangThaiSubtaskConsts } from '../../du-an/trang-thai-subtask-consts.enum';
import type { TrangThaiChamCongConsts } from '../trang-thai-cham-cong-consts.enum';
import type { PagedAndSortedResultRequestDto } from '@abp/ng.core';
import type { TrangThaiDuAnConsts } from '../../du-an/trang-thai-du-an-consts.enum';
import type { TrangThaiPheDuyetChamCongConsts } from '../trang-thai-phe-duyet-cham-cong-consts.enum';

export interface ChamCongDetail {
  tenSubtask?: string;
  thoiGian?: number;
  kieuViec?: string;
  loaiHinh?: string;
  chamCongDinhKemFiles: ChamCongDinhKemFiles[];
  ngayDuyetChamCong?: string;
}

export interface ChamCongDinhKemFiles {
  tenDinhKem?: string;
  fileDinhKem?: string;
}

export interface CongViecDto {
  congViecId?: string;
  subtaskId?: string;
  kieuViecId?: string;
  danhDauHoanThanh: boolean;
  loaiHinh: LoaiHinhConsts;
  onSite: boolean;
  soGio: number;
  trangThaiSubtask?: TrangThaiSubtaskConsts;
  chamCongDinhKemFiles: ChamCongDinhKemFiles[];
  ghiChu?: string;
}

export interface CreateOrUpdateChamCongInputDto {
  chamCongId?: string;
  sprintId?: string;
  taskId?: string;
  tenTask?: string;
  duAnId?: string;
  ngayChamCong?: string;
  thoiGianChamCong: number;
  congViecs: CongViecDto[];
}

export interface DataChamCong {
  chamCongId?: string;
  ngayChamCong?: string;
  thoiGianChamCong: number;
  trangThaiChamCong?: TrangThaiChamCongConsts;
  nghiNuaNgay: boolean;
  isDayOff: boolean;
}

export interface DuyetChamCongDanhSachNhanVien {
  startDate?: string;
  endDate?: string;
  chamCongs: DataChamCong[];
}

export interface DuyetChamCongListInputDto {
  nhanVienId?: string;
  chamCongIds: string[];
}

export interface GetAllChamCongInputDto extends PagedAndSortedResultRequestDto {
  duAnId?: string;
}

export interface GetAllChamCongListOutput {
  chamCongId?: string;
  ngayChamCong?: string;
  tenSprint?: string;
  tenTask?: string;
  thoiGian: number;
  trangThaiChamCong?: TrangThaiChamCongConsts;
  chamCongDetail: ChamCongDetail[];
}

export interface GetAllDuAnChamCongDto {
  id?: string;
  tenDuAn?: string;
  khachHang?: string;
  trangThai?: TrangThaiDuAnConsts;
  ngayBatDau?: string;
  ngayKetThuc?: string;
  tenQuanLyDuAn?: string;
  quanLyDuAnId?: string;
}

export interface GetAllDuAnChamCongInput extends PagedAndSortedResultRequestDto {
  keyword?: string;
  khachHang?: string;
  trangThai?: TrangThaiDuAnConsts;
}

export interface GetAllDuAnPMDuyetChamCongOutputDto {
  duAnId?: string;
  tenDuAn?: string;
  nhanSuChoDuyetChamCong: number;
  tongThoiGianChoDuyet: number;
  tongThoiGianDaThucHien: number;
  trangThaiPheDuyet: TrangThaiPheDuyetChamCongConsts;
}

export interface GetAllPMDuyetChamCongInputDto extends PagedAndSortedResultRequestDto {
  keyword?: string;
  startTime?: string;
  endTime?: string;
}

export interface GetListChamCongByDuAnIdInputDto extends PagedAndSortedResultRequestDto {
  keyword?: string;
  duAnId?: string;
  startTime?: string;
  endTime?: string;
}

export interface GetListChamCongByDuAnIdOutputDto {
  nhanVienId?: string;
  tenNhanVien?: string;
  listChamCong: DataChamCong[];
}

export interface GetThongTinChamCongChiTietOutputDto {
  chamCongId?: string;
  nhanVienId?: string;
  tenNhanVien?: string;
  ngayChamCong?: string;
  tenSprint?: string;
  tenTask?: string;
  tenSubtask?: string;
  kieuViec?: string;
  loaiHinh?: string;
  thoiGian: number;
  trangThaiSubtask?: TrangThaiSubtaskConsts;
  trangThaiChamCong?: TrangThaiChamCongConsts;
  ngayDuyetChamCong?: string;
  chamCongDinhKemFiles: ChamCongDinhKemFiles[];
  ghiChu?: string;
}

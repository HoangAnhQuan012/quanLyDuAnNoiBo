import type { TrangThaiDuAnConsts } from '../../du-an/trang-thai-du-an-consts.enum';
import type { PagedAndSortedResultRequestDto } from '@abp/ng.core';

export interface CreateDuAnDto {
  id?: string;
  maDuAn?: string;
  tenDuAn?: string;
  giaTriHopDong: number;
  soHopDong?: string;
  noiDungPhatTrien?: string;
  khachHang?: string;
  trangThai?: TrangThaiDuAnConsts;
  ngayBatDau?: string;
  ngayKetThuc?: string;
  quyTrinhPhatTrien?: string;
  congNgheSuDung?: string;
  ungDungDauCuoi?: string;
  quanLyDuAnId?: string;
  luongCoSo: number;
  duAnId?: string;
  banGiaoDungHan?: string;
  hieuQuaSuDungNhanSu?: string;
  noLucKhacPhucLoi?: string;
  mucDoHaiLongCuaKhachHang?: string;
  mucDoloiBiPhatHien?: string;
  mucDoLoiUAT?: string;
  tyLeThucHienDungQuyTrinh?: string;
  nangSuatTaoTestcase?: string;
  nangSuatThuThiTestcase?: string;
  nangSuatDev?: string;
  nangSuatVietUT?: string;
  nangSuatThucThiUT?: string;
  nangSuatBA?: string;
  giaTriHD: number;
  chiPhiABH: number;
  chiPhiOpexPhanBo: number;
  chiPhiLuongDuKien: number;
  chiPhiLuongThucTe: number;
  laiDuKien: number;
  laiThucTe: number;
  module: ModuleDto[];
}

export interface GetAllDuAnDto {
  id?: string;
  tenDuAn?: string;
  khachHang?: string;
  trangThai?: TrangThaiDuAnConsts;
  tienDo?: number;
  chiPhi?: number;
  maDuAn?: string;
  ngayBatDau?: string;
  ngayKetThuc?: string;
  nhanSu?: number;
}

export interface GetAllDuAnInputDto extends PagedAndSortedResultRequestDto {
  keyword?: string;
  khachHang?: string;
  trangThai?: TrangThaiDuAnConsts;
  quanLyDuAnId?: string;
}

export interface GetDuAnDto {
  id?: string;
  maDuAn?: string;
  tenDuAn?: string;
  giaTriHD: number;
  soHopDong?: string;
  noiDungPhatTrien?: string;
  khachHang?: string;
  trangThai?: TrangThaiDuAnConsts;
  ngayBatDau?: string;
  ngayKetThuc?: string;
  quyTrinhPhatTrien?: string;
  congNgheSuDung?: string;
  ungDungDauCuoi?: string;
  quanLyDuAnId?: string;
  luongCoSo: number;
  duAnId?: string;
  banGiaoDungHan?: string;
  hieuQuaSuDungNhanSu?: string;
  noLucKhacPhucLoi?: string;
  mucDoHaiLongCuaKhachHang?: string;
  mucDoloiBiPhatHien?: string;
  mucDoLoiUAT?: string;
  tyLeThucHienDungQuyTrinh?: string;
  nangSuatTaoTestcase?: string;
  nangSuatThuThiTestcase?: string;
  nangSuatDev?: string;
  nangSuatVietUT?: string;
  nangSuatThucThiUT?: string;
  nangSuatBA?: string;
  giaTriHopDong: number;
  chiPhiABH: number;
  chiPhiOpexPhanBo: number;
  chiPhiLuongDuKien: number;
  chiPhiLuongThucTe: number;
  laiDuKien: number;
  laiThucTe: number;
  module: ModuleDto[];
}

export interface ModuleDto {
  id?: string;
  tenModule?: string;
  pm: number;
  dev: number;
  test: number;
  ba: number;
  tongThoiGian: number;
}

export interface UpdateDuAnDto {
  id?: string;
  maDuAn?: string;
  tenDuAn?: string;
  giaTriHD: number;
  soHopDong?: string;
  noiDungPhatTrien?: string;
  khachHang?: string;
  ngayBatDau?: string;
  ngayKetThuc?: string;
  quyTrinhPhatTrien?: string;
  congNgheSuDung?: string;
  ungDungDauCuoi?: string;
  quanLyDuAnId?: string;
  luongCoSo: number;
  duAnId?: string;
  banGiaoDungHan?: string;
  hieuQuaSuDungNhanSu?: string;
  noLucKhacPhucLoi?: string;
  mucDoHaiLongCuaKhachHang?: string;
  mucDoloiBiPhatHien?: string;
  mucDoLoiUAT?: string;
  tyLeThucHienDungQuyTrinh?: string;
  nangSuatTaoTestcase?: string;
  nangSuatThuThiTestcase?: string;
  nangSuatDev?: string;
  nangSuatVietUT?: string;
  nangSuatThucThiUT?: string;
  nangSuatBA?: string;
  giaTriHopDong: number;
  chiPhiABH: number;
  chiPhiOpexPhanBo: number;
  chiPhiLuongDuKien: number;
  chiPhiLuongThucTe: number;
  laiDuKien: number;
  laiThucTe: number;
  module: ModuleDto[];
}

export interface SubTaskDto {
  id?: string;
  tenSubTask?: string;
  pm: number;
  dev: number;
  test: number;
  ba: number;
  moduleId?: string;
  sprintId?: string;
}

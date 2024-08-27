import type { ChuongTrinhPhucLoiStatus } from '../chuong-trinh-phuc-loi-status.enum';
import type { PagedAndSortedResultRequestDto } from '@abp/ng.core';
import type { ThoiHanLoaiHopDongConst } from '../thoi-han-loai-hop-dong-const.enum';

export interface CaLamViecDto {
  id?: string;
  maCaLamViec?: string;
  gioVaoLam?: string;
  gioTanLam?: string;
  mota?: string;
}

export interface ChucDanhDto {
  id?: string;
  maChucDanh?: string;
  tenChucDanh?: string;
  ngachChucDanh: number;
}

export interface ChuongTrinhPhucLoiDto {
  id?: string;
  maChuongTrinhPhucLoi?: string;
  tenChuongTrinhPhucLoi?: string;
  thoiGianBatDau?: string;
  thoiGianKetThuc?: string;
  trangThai: ChuongTrinhPhucLoiStatus;
  diaDiem?: string;
  moTa?: string;
}

export interface ChuyenMonDto {
  id?: string;
  tenChuyenMon?: string;
  moTa?: string;
}

export interface GetAllInputCaLamViecDto extends PagedAndSortedResultRequestDto {
  keyword?: string;
}

export interface GetAllInputChucDanhDto extends PagedAndSortedResultRequestDto {
  keyword?: string;
}

export interface GetAllInputChuongTrinhPhucLoiDto extends PagedAndSortedResultRequestDto {
  keyword?: string;
}

export interface GetAllInputChuyenMonDto extends PagedAndSortedResultRequestDto {
  keyword?: string;
}

export interface GetAllInputLoaiHopDongDto extends PagedAndSortedResultRequestDto {
  keyword?: string;
}

export interface GetAllInputPhongBanDto extends PagedAndSortedResultRequestDto {
  keyword?: string;
}

export interface GetAllInputTrinhDoHocVanDto extends PagedAndSortedResultRequestDto {
  keyword?: string;
}

export interface LoaiHopDongDto {
  id?: string;
  maLoaiHopDong?: string;
  tenLoaiHopDong?: string;
  thoiHanLoaiHopDong: ThoiHanLoaiHopDongConst;
}

export interface PhongBanDto {
  id?: string;
  maPhongBan?: string;
  tenPhongBan?: string;
  moTa?: string;
}

export interface TrinhDoHocVanDto {
  id?: string;
  maTrinhDoHocVan?: string;
  tenTrinhDoHocVan?: string;
  moTa?: string;
}

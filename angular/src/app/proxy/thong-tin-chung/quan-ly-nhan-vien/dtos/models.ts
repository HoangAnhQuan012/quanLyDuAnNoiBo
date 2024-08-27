import type { PagedAndSortedResultRequestDto } from '@abp/ng.core';
import type { GioiTinhConsts } from '../../../ho-so-nhan-vien/gioi-tinh-consts.enum';

export interface GetAllInputHoSoNhanVienDto extends PagedAndSortedResultRequestDto {
  keyword?: string;
}

export interface HoSoNhanVienDto {
  id?: string;
  userId?: string;
  maNhanVien?: string;
  hoTen?: string;
  ngaySinh?: string;
  gioiTinh: GioiTinhConsts;
  danToc?: string;
  caLamViec?: string;
  caLamViecId?: string;
  cmnd?: string;
  ngayCapCMND?: string;
  noiCapCMND?: string;
  noiSinh?: string;
  ngayVaoLam?: string;
  chucDanh?: string;
  chucDanhId?: string;
  phongBan?: string;
  phongBanId?: string;
  soDienThoai?: string;
  hoChieu?: string;
  email?: string;
  maSoThue?: string;
  ngayNghiViec?: string;
}

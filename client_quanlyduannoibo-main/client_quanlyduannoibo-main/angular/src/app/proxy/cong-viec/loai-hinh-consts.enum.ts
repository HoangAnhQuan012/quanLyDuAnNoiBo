import { mapEnumToOptions } from '@abp/ng.core';

export enum LoaiHinhConsts {
  BinhThuong = 1,
  OT = 2,
  Outsource = 3,
}

export const loaiHinhConstsOptions = mapEnumToOptions(LoaiHinhConsts);

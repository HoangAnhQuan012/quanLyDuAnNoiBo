import { mapEnumToOptions } from '@abp/ng.core';

export enum TrangThaiDuAnConsts {
  KhoiTao = 1,
  DangThucHien = 2,
  DangTamDung = 3,
  KetThuc = 4,
}

export const trangThaiDuAnConstsOptions = mapEnumToOptions(TrangThaiDuAnConsts);

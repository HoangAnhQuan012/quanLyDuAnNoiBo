import { mapEnumToOptions } from '@abp/ng.core';

export enum TrangThaiSprintConsts {
  KhoiTao = 1,
  ChuaGuiPheDuyet = 2,
  DaGuiPheDuyet = 3,
  DaPheDuyet = 4,
  DaHuy = 5,
}

export const trangThaiSprintConstsOptions = mapEnumToOptions(TrangThaiSprintConsts);

import { mapEnumToOptions } from '@abp/ng.core';

export enum TrangThaiSubtaskConsts {
  KhoiTao = 1,
  ChoPheDuyetSprint = 2,
  DaDuocPhanCong = 3,
  ChuaHoanThanh = 4,
  GuiYeuCauHoanThanh = 5,
  DaHoanThanh = 6,
  QuaHan = 7,
}

export const trangThaiSubtaskConstsOptions = mapEnumToOptions(TrangThaiSubtaskConsts);

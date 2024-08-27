import { mapEnumToOptions } from '@abp/ng.core';

export enum ThoiHanLoaiHopDongConst {
  VoThoiHan = 0,
  HaiThang = 2,
  MotNam = 12,
  HaiNam = 24,
}

export const thoiHanLoaiHopDongConstOptions = mapEnumToOptions(ThoiHanLoaiHopDongConst);

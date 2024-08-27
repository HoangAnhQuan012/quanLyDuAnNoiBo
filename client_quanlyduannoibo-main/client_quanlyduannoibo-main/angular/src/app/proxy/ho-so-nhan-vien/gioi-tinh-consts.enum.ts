import { mapEnumToOptions } from '@abp/ng.core';

export enum GioiTinhConsts {
  Nam = 1,
  Nu = 2,
  Khac = 3,
}

export const gioiTinhConstsOptions = mapEnumToOptions(GioiTinhConsts);

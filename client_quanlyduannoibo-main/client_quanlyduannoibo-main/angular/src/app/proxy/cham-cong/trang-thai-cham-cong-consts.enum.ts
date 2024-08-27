import { mapEnumToOptions } from '@abp/ng.core';

export enum TrangThaiChamCongConsts {
  ChoDuyet = 1,
  DaDuyet = 2,
  TuChoi = 3,
}

export const trangThaiChamCongConstsOptions = mapEnumToOptions(TrangThaiChamCongConsts);

import { mapEnumToOptions } from '@abp/ng.core';

export enum ChuongTrinhPhucLoiStatus {
  KhongSuDung = 0,
  SuDung = 1,
}

export const chuongTrinhPhucLoiStatusOptions = mapEnumToOptions(ChuongTrinhPhucLoiStatus);

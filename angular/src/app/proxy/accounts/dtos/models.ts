import type { ListResultDto, PagedAndSortedResultRequestDto } from '@abp/ng.core';
import type { IdentityRoleDto } from '../../volo/abp/identity/models';

export interface AccountDto {
  id?: string;
  firstName?: string;
  surName?: string;
  fullName?: string;
  email?: string;
  password?: string;
  roleNames: ListResultDto<IdentityRoleDto>;
  userName?: string;
  isActive: boolean;
  tenChucDanh?: string;
  chucDanhId?: string;
  bac: number;
  tyLe: number;
}

export interface CheckAccountInput {
  email?: string;
  accountId?: string;
}

export interface CreateOrEditAccountDto {
  id?: string;
  firstName?: string;
  surName?: string;
  email?: string;
  password?: string;
  roleNames: string[];
  userName?: string;
  isActive: boolean;
  chucDanhId?: string;
}

export interface GetAllInputAccountDto extends PagedAndSortedResultRequestDto {
  keyword?: string;
}

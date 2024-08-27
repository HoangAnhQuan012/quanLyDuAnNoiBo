import type { AccountDto, CheckAccountInput, CreateOrEditAccountDto, GetAllInputAccountDto } from './dtos/models';
import { RestService, Rest } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AccountsManagementService {
  apiName = 'Default';
  

  checkExistAccountByInput = (input: CheckAccountInput, config?: Partial<Rest.Config>) =>
    this.restService.request<any, boolean>({
      method: 'POST',
      url: '/api/app/accounts-management/check-exist-account',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  createAccount = (input: CreateOrEditAccountDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, boolean>({
      method: 'POST',
      url: '/api/app/accounts-management/account',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  getAccount = (id: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, AccountDto>({
      method: 'GET',
      url: `/api/app/accounts-management/${id}/account`,
    },
    { apiName: this.apiName,...config });
  

  getAllAccount = (input: GetAllInputAccountDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<AccountDto>>({
      method: 'GET',
      url: '/api/app/accounts-management/account',
      params: { keyword: input.keyword, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  updateAccount = (input: CreateOrEditAccountDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, boolean>({
      method: 'PUT',
      url: '/api/app/accounts-management/account',
      body: input,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}

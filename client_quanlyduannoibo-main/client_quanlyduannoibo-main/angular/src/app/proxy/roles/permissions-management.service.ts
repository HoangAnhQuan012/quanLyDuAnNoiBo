import { RestService, Rest } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { PermissionWithGrantedProviders, UpdatePermissionsDto } from '../volo/abp/permission-management/models';

@Injectable({
  providedIn: 'root',
})
export class PermissionsManagementService {
  apiName = 'Default';
  

  createPermissionGrantByRoleNameAndPermissions = (roleName: string, permissions: UpdatePermissionsDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, boolean>({
      method: 'POST',
      url: '/api/app/permissions-management/permission-grant',
      params: { roleName },
      body: permissions,
    },
    { apiName: this.apiName,...config });
  

  delete = (roleName: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, boolean>({
      method: 'DELETE',
      url: '/api/app/permissions-management',
      params: { roleName },
    },
    { apiName: this.apiName,...config });
  

  getAllPermissions = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, PermissionWithGrantedProviders[]>({
      method: 'GET',
      url: '/api/app/permissions-management/permissions',
    },
    { apiName: this.apiName,...config });
  

  getAllPermissionsByProviderKeyByProviderKey = (providerKey: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PermissionWithGrantedProviders[]>({
      method: 'GET',
      url: '/api/app/permissions-management/permissions-by-provider-key',
      params: { providerKey },
    },
    { apiName: this.apiName,...config });
  

  updatePermissionGrantByRoleNameAndPermissions = (roleName: string, permissions: UpdatePermissionsDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, boolean>({
      method: 'PUT',
      url: '/api/app/permissions-management/permission-grant',
      params: { roleName },
      body: permissions,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}

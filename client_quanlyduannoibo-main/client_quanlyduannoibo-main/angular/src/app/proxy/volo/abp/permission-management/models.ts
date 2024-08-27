
export interface PermissionValueProviderInfo {
  name?: string;
  key?: string;
}

export interface PermissionWithGrantedProviders {
  name?: string;
  isGranted: boolean;
  providers: PermissionValueProviderInfo[];
}

export interface UpdatePermissionDto {
  name?: string;
  isGranted: boolean;
}

export interface UpdatePermissionsDto {
  permissions: UpdatePermissionDto[];
}

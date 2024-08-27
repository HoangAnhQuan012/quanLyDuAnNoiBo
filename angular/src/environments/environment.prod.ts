import { Environment } from '@abp/ng.core';

const baseUrl = 'http://localhost:4200';

export const environment = {
  production: true,
  application: {
    baseUrl,
    name: 'quanLyDuAnNoiBo',
    logoUrl: '',
  },
  oAuthConfig: {
    issuer: 'https://localhost:44371/',
    redirectUri: baseUrl,
    clientId: 'quanLyDuAnNoiBo_App',
    responseType: 'code',
    scope: 'offline_access quanLyDuAnNoiBo',
    requireHttps: true
  },
  apis: {
    default: {
      url: 'https://localhost:44371',
      rootNamespace: 'quanLyDuAnNoiBo',
    },
  },
} as Environment;

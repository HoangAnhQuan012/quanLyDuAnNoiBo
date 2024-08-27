import { RestService, Rest } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  apiName = 'Default';
  

  uploadFile = (config?: Partial<Rest.Config>) =>
    this.restService.request<any, string>({
      method: 'POST',
      responseType: 'text',
      url: '/api/Upload/UploadFile',
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}

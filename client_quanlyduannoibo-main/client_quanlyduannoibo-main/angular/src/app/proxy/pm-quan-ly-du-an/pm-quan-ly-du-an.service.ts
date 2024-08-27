import type { CreateOrUpdateSprintDto, CreateSubTaskDto, GetAllDuAnByPmDto, GetAllDuAnByPmInputDto, GetAllSprintListOutputDto, GetDuAnByPmIdDto, ModuleSubTaskDto, UpdateSubTaskDto } from './dtos/models';
import { RestService, Rest } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { SubTaskDto } from '../bo-dquan-ly-du-an/dtos/models';

@Injectable({
  providedIn: 'root',
})
export class PmQuanLyDuAnService {
  apiName = 'Default';
  

  createSprint = (input: CreateOrUpdateSprintDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, boolean>({
      method: 'POST',
      url: '/api/app/pm-quan-ly-du-an/sprint',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  createSubTaskByModuleIdByInput = (input: CreateSubTaskDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: '/api/app/pm-quan-ly-du-an/sub-task-by-module-id',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  deleteSubTaskBySubTaskId = (subTaskId: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/pm-quan-ly-du-an/sub-task/${subTaskId}`,
    },
    { apiName: this.apiName,...config });
  

  getAllDuAnByPmByInput = (input: GetAllDuAnByPmInputDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, PagedResultDto<GetAllDuAnByPmDto>>({
      method: 'GET',
      url: '/api/app/pm-quan-ly-du-an/du-an-by-pm',
      params: { keyword: input.keyword, khachHang: input.khachHang, trangThai: input.trangThai, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName,...config });
  

  getAllListModuleByDuAnIdByDuAnId = (duAnId: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ModuleSubTaskDto[]>({
      method: 'GET',
      url: `/api/app/pm-quan-ly-du-an/list-module-by-du-an-id/${duAnId}`,
    },
    { apiName: this.apiName,...config });
  

  getAllMandayLeftByModuleIdAndSubTaskId = (moduleId: string, subTaskId: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, ModuleSubTaskDto>({
      method: 'GET',
      url: '/api/app/pm-quan-ly-du-an/manday-left',
      params: { moduleId, subTaskId },
    },
    { apiName: this.apiName,...config });
  

  getAllSprints = (duAnId: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, GetAllSprintListOutputDto[]>({
      method: 'GET',
      url: `/api/app/pm-quan-ly-du-an/sprints/${duAnId}`,
    },
    { apiName: this.apiName,...config });
  

  getAllSprintsThucTienCuaPMByDuAnId = (duAnId: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, GetAllSprintListOutputDto[]>({
      method: 'GET',
      url: `/api/app/pm-quan-ly-du-an/sprints-thuc-tien-cua-pM/${duAnId}`,
    },
    { apiName: this.apiName,...config });
  

  getDuAnByPmIdByDuAnId = (duAnId: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, GetDuAnByPmIdDto>({
      method: 'GET',
      url: `/api/app/pm-quan-ly-du-an/du-an-by-pm-id/${duAnId}`,
    },
    { apiName: this.apiName,...config });
  

  getSubTaskForEditBySubTaskId = (subTaskId: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, SubTaskDto>({
      method: 'GET',
      url: `/api/app/pm-quan-ly-du-an/sub-task-for-edit/${subTaskId}`,
    },
    { apiName: this.apiName,...config });
  

  sendAcceptSprintToBoDBySprintId = (sprintId: string, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'POST',
      url: `/api/app/pm-quan-ly-du-an/send-accept-sprint-to-bo-d/${sprintId}`,
    },
    { apiName: this.apiName,...config });
  

  updateSprint = (input: CreateOrUpdateSprintDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, boolean>({
      method: 'PUT',
      url: '/api/app/pm-quan-ly-du-an/sprint',
      body: input,
    },
    { apiName: this.apiName,...config });
  

  updateSubtaskByInput = (input: UpdateSubTaskDto, config?: Partial<Rest.Config>) =>
    this.restService.request<any, void>({
      method: 'PUT',
      url: '/api/app/pm-quan-ly-du-an/subtask',
      body: input,
    },
    { apiName: this.apiName,...config });

  constructor(private restService: RestService) {}
}

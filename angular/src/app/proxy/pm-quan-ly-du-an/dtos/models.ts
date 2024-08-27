import type { TrangThaiSprintConsts } from '../../du-an/trang-thai-sprint-consts.enum';
import type { TrangThaiDuAnConsts } from '../../du-an/trang-thai-du-an-consts.enum';
import type { PagedAndSortedResultRequestDto } from '@abp/ng.core';
import type { ModuleDto } from '../../bo-dquan-ly-du-an/dtos/models';
import type { LookupTableDto } from '../../global/dtos/models';
import type { TrangThaiSubtaskConsts } from '../../du-an/trang-thai-subtask-consts.enum';

export interface CreateOrUpdateSprintDto {
  sprintId?: string;
  tenSprint?: string;
  ngayBatDau?: string;
  ngayKetThuc?: string;
  duAnId?: string;
  trangThaiSprint: TrangThaiSprintConsts;
  subtasks: SubtaskTimeAndEmployees[];
}

export interface CreateSubTaskDto {
  moduleId?: string;
  tenSubTask?: string;
  pm: number;
  dev: number;
  test: number;
  ba: number;
}

export interface GetAllDuAnByPmDto {
  id?: string;
  tenDuAn?: string;
  khachHang?: string;
  trangThai?: TrangThaiDuAnConsts;
  tienDo?: number;
  chiPhi?: number;
  maDuAn?: string;
  ngayBatDau?: string;
  ngayKetThuc?: string;
  nhanSu?: number;
}

export interface GetAllDuAnByPmInputDto extends PagedAndSortedResultRequestDto {
  keyword?: string;
  khachHang?: string;
  trangThai?: TrangThaiDuAnConsts;
}

export interface GetAllSprintListOutputDto {
  id?: string;
  tenSprint?: string;
  ngayBatDau?: string;
  ngayKetThuc?: string;
  duAnId?: string;
  tongSoGio?: number;
  trangThaiSprint?: TrangThaiSprintConsts;
  tasks: TaskInfo[];
}

export interface GetDuAnByPmIdDto {
  tenDuAn?: string;
  modules: ModuleDto[];
}

export interface ModuleSubTaskDto {
  id?: string;
  tenModule?: string;
  pm: number;
  dev: number;
  test: number;
  ba: number;
  tongThoiGian: number;
  subTasks: SubtaskInfo[];
}

export interface SubtaskInfo {
  subtaskId?: string;
  tenSubtask?: string;
  pm?: number;
  dev?: number;
  ba?: number;
  tester?: number;
  tongSoGio?: number;
  thoiGianBatDau?: string;
  thoiGianKetThuc?: string;
  nhanSu: LookupTableDto[];
  trangThaiSubtask?: TrangThaiSubtaskConsts;
}

export interface SubtaskTimeAndEmployees {
  subtaskId?: string;
  thoiGianBatDau?: string;
  thoiGianKetThuc?: string;
  nhanSu: LookupTableDto[];
}

export interface TaskInfo {
  taskId?: string;
  tenTask?: string;
  tongSoGio?: number;
  subtasks: SubtaskInfo[];
}

export interface UpdateSubTaskDto {
  id?: string;
  tenSubTask?: string;
  pm: number;
  dev: number;
  test: number;
  ba: number;
}

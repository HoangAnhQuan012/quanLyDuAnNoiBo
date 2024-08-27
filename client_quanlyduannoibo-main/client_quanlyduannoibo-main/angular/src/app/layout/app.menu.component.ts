import { Injector, OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { AppComponentBase } from '../shared/app.component-base';
import { PermissionService } from '@abp/ng.core';

@Component({
  selector: 'app-menu',
  templateUrl: './app.menu.component.html'
})
export class AppMenuComponent extends AppComponentBase implements OnInit {

  model: any[] = [];

  constructor(
    injector: Injector,
    public layoutService: LayoutService,
    private permissionService: PermissionService) {
    super(injector);
  }

  ngOnInit() {
    this.model = [
      {
        items: [
          {
            label: 'Quản lý nhân sự', icon: 'nhan-cu-icon', routerLink: ['/main/quan-ly-nhan-su'],
            items: [
              {
                label: "Thông tin nhân viên", icon: 'pi pi-users',
                items: [
                  { label: "Hồ sơ nhân viên", icon: 'pi pi-fw pi-home', routerLink: ['/main/quan-ly-nhan-su/thong-tin-nhan-vien/ho-so-nhan-vien'] },
                ],
              },
            ],
            visible: this.isGrantedAny('quanLyDuAnNoiBo.HRManagement')
          },
          {
            label: 'Quản lý danh mục', icon: 'dashboard-icon',
            items: [
              { label: "Phòng ban", icon: 'bi bi-record-fill', routerLink: ['/main/danhMuc/phong-ban'] },
              { label: "Chức danh", icon: 'bi bi-record-fill', routerLink: ['/main/danhMuc/chuc-danh'] },
            ],
            visible: this.isGrantedAny('quanLyDuAnNoiBo.DanhMucManagement')
          },
          {
            label: 'Quản lý chấm công', icon: 'cham-cong-icon',
            items: [
              {
                label: "Phê duyệt chấm công",
                icon: 'bi bi-record-fill',
                routerLink: ['main/quan-ly-cham-cong/phe-duyet-cham-cong'],
                visible: this.isGrantedAny('quanLyDuAnNoiBo.PheDuyetChamCong')
              },
              {
                label: "Chấm công",
                icon: 'bi bi-record-fill',
                routerLink: ['main/quan-ly-cham-cong/cham-cong'],
                visible: this.isGrantedAny('quanLyDuAnNoiBo.NhanVienChamCong')
              }
            ],
            visible: []
          },
          {
            label: 'Quản lý dự án', icon: 'qlda-icon',
            items: [
              {
                label: "BOD quản lý dự án",
                icon: 'bi bi-record-fill',
                routerLink: ['main/quan-ly-du-an/bod-quan-ly-du-an'],
                visible: this.isGrantedAny('quanLyDuAnNoiBo.BoDProjectManagement')
              },
              {
                label: "PM quản lý dự án",
                icon: 'bi bi-record-fill',
                routerLink: ['main/quan-ly-du-an/pm-quan-ly-du-an'],
                visible: this.isGrantedAny('quanLyDuAnNoiBo.ProjectManagement')
              },
              {
                label: "Nhân viên quản lý dự án",
                icon: 'bi bi-record-fill',
                routerLink: ['main/quan-ly-du-an/nhan-vien-quan-ly-du-an']
              }
            ],
            visible: []
          },
          {
            label: 'Báo cáo', icon: 'bao-cao-icon',
            items: [
              { label: "Báo tổng hợp", icon: 'bi bi-record-fill', routerLink: ['/main/bao-cao/bao-cao-tien-do'] },
            ],
            visible: []
          },
          {
            label: 'Quản trị hệ thống', icon: 'quan-tri-he-thong-icon',
            items: [
              { label: "Quản lý người dùng", icon: 'bi bi-record-fill', routerLink: ['/main/quan-tri-he-thong/quan-ly-nguoi-dung'] },
              { label: "Quản lý phân quyền", icon: 'bi bi-record-fill', routerLink: ['/main/quan-tri-he-thong/quan-ly-phan-quyen'] }
            ],
            visible: this.isGrantedAny('quanLyDuAnNoiBo.AccountManagement'),
          },
        ]
      },
    ];
  }

  isGrantedAny(...permissions: string[]): boolean {
    if (!permissions) {
      return false;
    }
    for (const permission of permissions) {
      if (this.permissionService.getGrantedPolicy(permission)) {
        return true;
      }
    }

    return false;
  }

  showMenuItem(items: any[]): boolean {
    if (!items) {
      return false;
    } else {
      items.forEach(item => {
        console.log(item.permissions);
        return item.permissions;
      });
    }
  }
}

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import { AuthService } from '@abp/ng.core';
import { Router } from '@angular/router';
import { LookUpTableService } from '@proxy/global';

@Component({
  selector: 'app-topbar',
  templateUrl: './app.topbar.component.html',
  styleUrls: ['./app.topbar.component.scss']
})
export class AppTopBarComponent implements OnInit {

  items!: MenuItem[];
  username = '';
  notifyNumber = 3;
  notifications: any[] = [];

  @ViewChild('menubutton') menuButton!: ElementRef;

  @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

  @ViewChild('topbarmenu') menu!: ElementRef;

  constructor(
    public layoutService: LayoutService,
    private _authService: AuthService,
    private _router: Router,
    private _lookupTableService: LookUpTableService,
  ) { }

  ngOnInit(): void {
    this._lookupTableService.getCurrentUsername().subscribe((res) => {
      this.username = res;
    });

    this.notifications = [
      { tenTask: 'Thêm mới khách hàng', trangThai: 'đã quá hạn', time: '12/05/2024', trangThaiSubtask: 1 },
      { tenTask: 'Nghiên cứu', trangThai: 'đã hoàn thành', time: '12/05/2024', trangThaiSubtask: 2 },
      { tenTask: 'Khảo sát', trangThai: 'sẽ hết hạn', time: '12/05/2024', trangThaiSubtask: 3 },
    ]
  }

  logout() {
    this._authService.logout().subscribe(() => {
      this._router.navigateByUrl('auth/login');
    });
  }
}

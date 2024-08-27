import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NhanVienQuanLyDuAnService } from '@proxy/nhan-vien-quan-ly-du-an';
import { GetAllSprintListOutputDto } from '@proxy/pm-quan-ly-du-an/dtos';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-nhan-vien-xem-chi-tiet',
  templateUrl: './nhan-vien-xem-chi-tiet.component.html',
  styleUrls: ['./nhan-vien-xem-chi-tiet.component.scss']
})
export class NhanVienXemChiTietComponent implements OnInit {

  duAnId: string;
  tenDuAn: string;
  sprintsKeHoach: GetAllSprintListOutputDto[] = [];
  sprintsThucTe: GetAllSprintListOutputDto[] = [];

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _nhanVienQuanLyDuAnService: NhanVienQuanLyDuAnService,
  ) { }

  ngOnInit() {
    this._activatedRoute.params.subscribe((params) => {
      this.duAnId = params['id'];
    });
    this._activatedRoute.queryParams.subscribe(params => {
      this.tenDuAn = params['tenDuAn'];
    });
    forkJoin([
      this._nhanVienQuanLyDuAnService.getAllSprintsKeHoach(this.duAnId),
      this._nhanVienQuanLyDuAnService.getAllSprintsThucTienByDuAnId(this.duAnId)
    ]).subscribe(([sprintsKeHoach, sprintsThucTe]) => {
      this.sprintsKeHoach = sprintsKeHoach;
      this.sprintsThucTe = sprintsThucTe;
    });
  }

  backLine() {
    this._router.navigate(['main/quan-ly-du-an/nhan-vien-quan-ly-du-an']);
  }

}

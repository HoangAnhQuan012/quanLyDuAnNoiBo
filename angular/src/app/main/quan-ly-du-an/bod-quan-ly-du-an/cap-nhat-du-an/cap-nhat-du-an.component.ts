import { Component, Injector, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BoDQuanLyDuAnService } from '@proxy/bo-dquan-ly-du-an';
import { GetDuAnDto, ModuleDto } from '@proxy/bo-dquan-ly-du-an/dtos';
import { LookupTableDto } from '@proxy/global/dtos';
import * as moment from 'moment';
import { PrimeNGConfig } from 'primeng/api';
import { catchError, finalize, forkJoin } from 'rxjs';
import { AppComponentBase } from 'src/app/shared/app.component-base';
import { CommonComponent } from 'src/app/shared/validation/common.component';
import * as _ from 'lodash';
import { LookUpTableService } from '@proxy/global';
import { GetAllSprintListOutputDto } from '@proxy/pm-quan-ly-du-an/dtos';

@Component({
  selector: 'app-cap-nhat-du-an',
  templateUrl: './cap-nhat-du-an.component.html',
  styleUrls: ['./cap-nhat-du-an.component.scss']
})
export class CapNhatDuAnComponent extends AppComponentBase implements OnInit {

  formData: FormGroup;

  files = [];
  totalSize: number = 0;
  totalSizePercent: number = 0;
  // accept file word, excel, pdf, png, jpg
  fileAccepts = ['application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.ms-excel', 'application/pdf', 'image/png', 'image/jpeg'];
  maxFileSize = 20000000; // 20MB
  acceptString: string;
  loading = false;

  routeSub: any;
  id: string;
  duAnInfo: GetDuAnDto;
  quanLyDuAn: LookupTableDto<string>[];

  tongCong: number;
  isView = false;

  sprints: GetAllSprintListOutputDto[] = [];
  refreshLoading = false;

  constructor(
    injector: Injector,
    private _fb: FormBuilder,
    private _router: Router,
    private config: PrimeNGConfig,
    private _activatedRoute: ActivatedRoute,
    private _bodQuanLyDuAnService: BoDQuanLyDuAnService,
    private _lookupTableService: LookUpTableService,
  ) {
    super(injector);
  }

  ngOnInit() {
    this.routeSub = this._activatedRoute.params.subscribe((params) => {
      this.id = params['id'];
    });

    this._activatedRoute.queryParams.subscribe(params => {
      this.isView = params['isView'] === 'true';
    })
    this._initForm();
    forkJoin([
      this._lookupTableService.getAllQuanLyDuAn(),
      this._bodQuanLyDuAnService.getDuAnById(this.id)
    ]).subscribe(([quanLyDuAn, duAn]) => {
      this.duAnInfo = duAn;
      this.quanLyDuAn = quanLyDuAn;
      this.setValueForEdit();
      if (this.isView) {
        this.formData.disable();
      }
    });
    this.refreshSprint();
    this.acceptString = this.fileAccepts.join(',');
  }

  _initForm() {
    this.formData = this._fb.group({
      maDuAn: ['', [Validators.required]],
      tenDuAn: ['', [Validators.required]],
      giaTriHD: [''],
      soHopDong: [''],
      khachHang: ['', [Validators.required]],
      noiDungPhatTrien: ['', [Validators.required]],
      ngayBatDau: ['', [Validators.required]],
      ngayKetThuc: ['', [Validators.required]],
      ungDungDauCuoi: ['', [Validators.required]],
      congNgheSuDung: ['', [Validators.required]],
      quyTrinhPhatTrien: ['', [Validators.required]],
      quanLyDuAn: [undefined, [Validators.required]],
      luongCoSo: ['', [Validators.required]],
      modules: this._fb.array([]),
      banGiaoDungHan: [''],
      hieuQuaSuDungNhanSu: [''],
      noLucKhacPhucLoi: [''],
      mucDoHaiLongCuaKhachHang: [''],
      mucDoLoiBiPhatHien: [''],
      mucDoLoiUAT: [''],
      tyLeThucHienDungQuyTrinh: [''],
      nangSuatTaoTestcase: [''],
      nangSuatThuThiTestcase: [''],
      nangSuatDev: [''],
      nangSuatVietUT: [''],
      nangSuatThucThiUT: [''],
      nangSuatBA: [''],
      giaTriHopDong: [''],
      chiPhiABH: [''],
      chiPhiOpexPhanBo: [''],
      chiPhiLuongDuKien: [''],
      chiPhiLuongThucTe: [''],
      laiDuKien: [''],
      laiThucTe: [''],
    })
  }

  choose(event, callback) {
    callback();
  }

  onRemoveTemplatingFile(event, file, removeFileCallback, index) {
    removeFileCallback(event, index);
    this.totalSize -= parseInt(this.formatSize(file.size));
    this.totalSizePercent = this.totalSize / 10;
  }

  onClearTemplatingUpload(clear) {
    clear();
    this.totalSize = 0;
    this.totalSizePercent = 0;
  }

  onTemplatedUpload() {
    this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 3000 });
  }

  onSelectedFiles(event) {
    this.files = event.currentFiles;
    this.files.forEach((file) => {
      this.totalSize += parseInt(this.formatSize(file.size));
    });
    this.totalSizePercent = this.totalSize / 10;
  }

  uploadEvent(callback) {
    callback();
  }

  formatSize(bytes) {
    const k = 1024;
    const dm = 3;
    const sizes = this.config.translation.fileSizeTypes;
    if (bytes === 0) {
      return `0 ${sizes[0]}`;
    }

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    const formattedSize = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));

    return `${formattedSize} ${sizes[i]}`;
  }

  backLine() {
    this._router.navigate(['main/quan-ly-du-an/bod-quan-ly-du-an']);
  }

  save() {
    if (CommonComponent.getControlErr(this.formData) === '') {
      this.loading = true;
      this.getValueForSave();
      this._bodQuanLyDuAnService.updateDuAn(this.duAnInfo)
        .pipe(
          finalize(() => {
            this.loading = false;
          }),
          catchError((err) => {
            this.showErrorMessage(err.error.error.code);
            return err;
          })
        )
        .subscribe((res) => {
          if (res) {
            this.showUpdateSuccessMessage('Cập nhật dự án thành công');
            setTimeout(() => {
              this._router.navigate(['main/quan-ly-du-an/bod-quan-ly-du-an']);
            }, 2000);
          } else {
            this.showErrorMessage('Mã dự án đã tồn tại');
          }
        });
    }
  }

  private setValueForEdit() {
    this.formData.controls.maDuAn.setValue(this.duAnInfo.maDuAn);
    this.formData.controls.tenDuAn.setValue(this.duAnInfo.tenDuAn);
    this.formData.controls.giaTriHD.setValue(this.duAnInfo.giaTriHD);
    this.formData.controls.soHopDong.setValue(this.duAnInfo.soHopDong);
    this.formData.controls.khachHang.setValue(this.duAnInfo.khachHang);
    this.formData.controls.noiDungPhatTrien.setValue(this.duAnInfo.noiDungPhatTrien);
    this.formData.controls.ngayBatDau.setValue(CommonComponent.getDateForEditFromMoment(this.duAnInfo.ngayBatDau as unknown as moment.Moment));
    this.formData.controls.ngayKetThuc.setValue(CommonComponent.getDateForEditFromMoment(this.duAnInfo.ngayKetThuc as unknown as moment.Moment));
    this.formData.controls.ungDungDauCuoi.setValue(this.duAnInfo.ungDungDauCuoi.split(','));
    this.formData.controls.congNgheSuDung.setValue(this.duAnInfo.congNgheSuDung);
    this.formData.controls.quyTrinhPhatTrien.setValue(this.duAnInfo.quyTrinhPhatTrien);
    this.formData.controls.quanLyDuAn.setValue(this.quanLyDuAn.find(x => x.id === this.duAnInfo.quanLyDuAnId));
    this.formData.controls.luongCoSo.setValue(this.duAnInfo.luongCoSo);
    this.formData.controls.banGiaoDungHan.setValue(this.duAnInfo.banGiaoDungHan);
    this.formData.controls.hieuQuaSuDungNhanSu.setValue(this.duAnInfo.hieuQuaSuDungNhanSu);
    this.formData.controls.noLucKhacPhucLoi.setValue(this.duAnInfo.noLucKhacPhucLoi);
    this.formData.controls.mucDoHaiLongCuaKhachHang.setValue(this.duAnInfo.mucDoHaiLongCuaKhachHang);
    this.formData.controls.mucDoLoiBiPhatHien.setValue(this.duAnInfo.mucDoloiBiPhatHien);
    this.formData.controls.mucDoLoiUAT.setValue(this.duAnInfo.mucDoLoiUAT);
    this.formData.controls.tyLeThucHienDungQuyTrinh.setValue(this.duAnInfo.tyLeThucHienDungQuyTrinh);
    this.formData.controls.nangSuatTaoTestcase.setValue(this.duAnInfo.nangSuatTaoTestcase);
    this.formData.controls.nangSuatThuThiTestcase.setValue(this.duAnInfo.nangSuatThuThiTestcase);
    this.formData.controls.nangSuatDev.setValue(this.duAnInfo.nangSuatDev);
    this.formData.controls.nangSuatVietUT.setValue(this.duAnInfo.nangSuatVietUT);
    this.formData.controls.nangSuatThucThiUT.setValue(this.duAnInfo.nangSuatThucThiUT);
    this.formData.controls.nangSuatBA.setValue(this.duAnInfo.nangSuatBA);
    this.formData.controls.giaTriHopDong.setValue(this.duAnInfo.giaTriHopDong);
    this.formData.controls.chiPhiABH.setValue(this.duAnInfo.chiPhiABH);
    this.formData.controls.chiPhiOpexPhanBo.setValue(this.duAnInfo.chiPhiOpexPhanBo);
    this.formData.controls.chiPhiLuongDuKien.setValue(this.duAnInfo.chiPhiLuongDuKien);
    this.formData.controls.chiPhiLuongThucTe.setValue(this.duAnInfo.chiPhiLuongThucTe);
    this.formData.controls.laiDuKien.setValue(this.duAnInfo.laiDuKien);
    this.formData.controls.laiThucTe.setValue(this.duAnInfo.laiThucTe);

    // Hiển thị module
    const control = this.formData.get('modules') as FormArray;
    this.duAnInfo.module = _.sortBy(this.duAnInfo.module, e => e.soThuTu);

    this.tongCong = 0;
    for (const module of this.duAnInfo.module) {
      control.push(this.addModule(module.id, module.tenModule, module.pm, module.dev, module.test, module.ba, module.tongThoiGian));

      this.tongCong += module.tongThoiGian;
    }

    this.tongCong = +this.tongCong.toFixed(2);
  }

  private getValueForSave() {
    this.duAnInfo.maDuAn = this.formData.get('maDuAn').value;
    this.duAnInfo.tenDuAn = this.formData.get('tenDuAn').value;
    this.duAnInfo.giaTriHD = this.formData.get('giaTriHD').value;
    this.duAnInfo.soHopDong = this.formData.get('soHopDong').value;
    this.duAnInfo.khachHang = this.formData.get('khachHang').value;
    this.duAnInfo.noiDungPhatTrien = this.formData.get('noiDungPhatTrien').value;
    this.duAnInfo.ngayBatDau = this.formData.get('ngayBatDau').value;
    this.duAnInfo.ngayKetThuc = this.formData.get('ngayKetThuc').value;
    this.duAnInfo.ungDungDauCuoi = this.formData.get('ungDungDauCuoi').value.join(',');
    this.duAnInfo.congNgheSuDung = this.formData.get('congNgheSuDung').value;
    this.duAnInfo.quyTrinhPhatTrien = this.formData.get('quyTrinhPhatTrien').value;
    this.duAnInfo.quanLyDuAnId = this.formData.get('quanLyDuAn').value?.id;
    this.duAnInfo.luongCoSo = this.formData.get('luongCoSo').value;
    this.duAnInfo.banGiaoDungHan = this.formData.get('banGiaoDungHan').value;
    this.duAnInfo.hieuQuaSuDungNhanSu = this.formData.get('hieuQuaSuDungNhanSu').value;
    this.duAnInfo.noLucKhacPhucLoi = this.formData.get('noLucKhacPhucLoi').value;
    this.duAnInfo.mucDoHaiLongCuaKhachHang = this.formData.get('mucDoHaiLongCuaKhachHang').value;
    this.duAnInfo.mucDoloiBiPhatHien = this.formData.get('mucDoLoiBiPhatHien').value;
    this.duAnInfo.mucDoLoiUAT = this.formData.get('mucDoLoiUAT').value;
    this.duAnInfo.tyLeThucHienDungQuyTrinh = this.formData.get('tyLeThucHienDungQuyTrinh').value;
    this.duAnInfo.nangSuatTaoTestcase = this.formData.get('nangSuatTaoTestcase').value;
    this.duAnInfo.nangSuatThuThiTestcase = this.formData.get('nangSuatThuThiTestcase').value;
    this.duAnInfo.nangSuatDev = this.formData.get('nangSuatDev').value;
    this.duAnInfo.nangSuatVietUT = this.formData.get('nangSuatVietUT').value;
    this.duAnInfo.nangSuatThucThiUT = this.formData.get('nangSuatThucThiUT').value;
    this.duAnInfo.nangSuatBA = this.formData.get('nangSuatBA').value;
    this.duAnInfo.giaTriHopDong = this.formData.get('giaTriHopDong').value;
    this.duAnInfo.chiPhiABH = this.formData.get('chiPhiABH').value;
    this.duAnInfo.chiPhiOpexPhanBo = this.formData.get('chiPhiOpexPhanBo').value;
    this.duAnInfo.chiPhiLuongDuKien = this.formData.get('chiPhiLuongDuKien').value;
    this.duAnInfo.chiPhiLuongThucTe = this.formData.get('chiPhiLuongThucTe').value;
    this.duAnInfo.laiDuKien = this.formData.get('laiDuKien').value;
    this.duAnInfo.laiThucTe = this.formData.get('laiThucTe').value;

    this.duAnInfo.module = [];
    // Modules
    if (this.formData.get('modules')['controls'].length > 0) {
      for (const form of this.formData.get('modules')['controls']) {
        const item = form.getRawValue();
        const module = {} as ModuleDto;
        module.id = item.id ? item.id : null;
        module.tenModule = item.tenModule;
        module.pm = item.pm;
        module.dev = item.dev;
        module.ba = item.ba;
        module.test = item.test;
        module.tongThoiGian = Number(item.cong.toFixed(2));
        // module.changeRequest = item.changeRequest;
        // module.soThuTu = index;
        this.duAnInfo.module.push(module);
      }
    }
  }

  private addModule(id = '', tenModule = '', pm = 0, dev = 0, test = 0, ba = 0, cong = 0) {
    return this._fb.group({
      id,
      maModule: [''],
      tenModule: [tenModule, Validators.required],
      changeRequest: [false],
      pm: [pm, [Validators.required, Validators.min(0.0)]],
      dev: [dev, [Validators.required, Validators.min(0.0)]],
      test: [test, [Validators.required, Validators.min(0.0)]],
      ba: [ba, [Validators.required, Validators.min(0.0)]],
      cong: [{ value: cong, disabled: true }],
    });
  }

  themModule() {
    const control = this.formData.get('modules') as FormArray;
    control.push(this.addModule());
  }

  kiemTraLogwork() { }

  xoaModule(index: number) {
    const control = this.formData.get('modules') as FormArray;
    control.removeAt(index);

    this.sumTongCong();
  }

  tinhGio(control, index: number) {
    this.subscription.add(control.valueChanges.subscribe(() => {
      this.tinhTong(index);
      this.sumTongCong();
    }));
  }

  sumTongCong() {
    this.tongCong = 0;

    for (const form of this.formData.get('modules')['controls']) {
      this.tongCong += form.getRawValue().cong || 0;
    }

    this.tongCong = +this.tongCong.toFixed(2);
  }

  tinhTong(index: number) {
    const formArray = this.formData.get('modules') as FormArray;
    const controlCong = formArray.at(index)['controls'].cong;
    const controlPm = Number(formArray.at(index)['controls'].pm.value) || 0;
    const controlDev = Number(formArray.at(index)['controls'].dev.value) || 0;
    const controlTest = Number(formArray.at(index)['controls'].test.value) || 0;
    const controlBa = Number(formArray.at(index)['controls'].ba.value) || 0;
    controlCong.setValue(controlPm + controlDev + controlTest + controlBa);
  }


  refreshSprint() {
    this._bodQuanLyDuAnService.getAllSprintsPheDuyetVaChuaPheDuyet(this.id)
    .pipe(
      finalize(() => {
        this.refreshLoading = false;
      })
    )
    .subscribe((res) => {
      this.sprints = res;
    });
  }

  pheDuyet(sprintId: string) {
    this._bodQuanLyDuAnService.acceptSprintBySprintId(sprintId)
    .pipe(
      finalize(() => {
        this.refreshLoading = false;
      })
    ).subscribe((res) => {
      this.showUpdateSuccessMessage('Phê duyệt sprint thành công');
      this.refreshSprint();
    });
  }

}

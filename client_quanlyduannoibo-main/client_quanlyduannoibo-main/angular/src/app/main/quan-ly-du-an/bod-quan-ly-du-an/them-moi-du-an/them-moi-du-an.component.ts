import { Component, Injector, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BoDQuanLyDuAnService } from '@proxy/bo-dquan-ly-du-an';
import { GetDuAnDto } from '@proxy/bo-dquan-ly-du-an/dtos';
import { LookupTableDto } from '@proxy/global/dtos';
import { PrimeNGConfig } from 'primeng/api';
import { catchError, finalize } from 'rxjs';
import { AppComponentBase } from 'src/app/shared/app.component-base';
import { CommonComponent } from 'src/app/shared/validation/common.component';
import { ModuleDto } from '@proxy/bo-dquan-ly-du-an/dtos/models';
import { LookUpTableService } from '@proxy/global';

@Component({
  selector: 'app-them-moi-du-an',
  templateUrl: './them-moi-du-an.component.html',
  styleUrls: ['./them-moi-du-an.component.scss']
})
export class ThemMoiDuAnComponent extends AppComponentBase implements OnInit {

  formData: FormGroup;
  files = [];
  totalSize: number = 0;
  totalSizePercent: number = 0;
  // accept file word, excel, pdf, png, jpg
  fileAccepts = ['application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.ms-excel', 'application/pdf', 'image/png', 'image/jpeg'];
  maxFileSize = 20000000; // 20MB
  acceptString: string;

  input = {} as GetDuAnDto;
  loading = false;
  quanLyDuAn: LookupTableDto<string>[];

  tongCong: number;

  constructor(
    injector: Injector,
    private _fb: FormBuilder,
    private _router: Router,
    private config: PrimeNGConfig,
    private _boDQuanLyDuAnService: BoDQuanLyDuAnService,
    private _lookupTableService: LookUpTableService,
  ) {
    super(injector);
  }

  ngOnInit() {
    this._initForm()
    this._lookupTableService.getAllQuanLyDuAn().subscribe(res => {
      this.quanLyDuAn = res;
    });
  }

  _initForm() {
    this.formData = this._fb.group({
      maDuAn: ['', [Validators.required]],
      tenDuAn: ['', [Validators.required]],
      giaTriHD: [0],
      soHopDong: [''],
      khachHang: ['', [Validators.required]],
      noiDungPhatTrien: ['', [Validators.required]],
      ngayBatDau: ['', [Validators.required]],
      ngayKetThuc: ['', [Validators.required]],
      ungDungDauCuoi: ['', [Validators.required]],
      congNgheSuDung: ['', [Validators.required]],
      quyTrinhPhatTrien: ['', [Validators.required]],
      quanLyDuAn: ['', [Validators.required]],
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
      giaTriHopDong: [0],
      chiPhiABH: [0],
      chiPhiOpexPhanBo: [0],
      chiPhiLuongDuKien: [0],
      chiPhiLuongThucTe: [0],
      laiDuKien: [0],
      laiThucTe: [0],
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
    // this.messageService.add({ severity: 'info', summary: 'Success', detail: 'File Uploaded', life: 3000 });
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
      this._boDQuanLyDuAnService.createDuAn(this.input)
        .pipe(
          finalize(() => {
            this.loading = false;
          }),
          catchError((err) => {
            this.showErrorMessage(err.error.error.code);
            return err;
          })
        ).subscribe((res) => {
          if (res) {
            this.showUpdateSuccessMessage('Thêm mới dự án thành công');
            setTimeout(() => {
              this._router.navigate(['main/quan-ly-du-an/bod-quan-ly-du-an']);
            }, 1000);
          } else {
            this.showErrorMessage('Mã dự án đã tồn tại');
          }
        })
    }
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

  private addModule(id = 0, changeRequest = false, maModule = '', tenModule = '', pm = 0, dev = 0, test = 0, ba = 0, cong = 0) {
    return this._fb.group({
      id,
      maModule: [maModule],
      tenModule: [tenModule, Validators.required],
      changeRequest: [changeRequest],
      pm: [pm, [Validators.required, Validators.min(0.0)]],
      dev: [dev, [Validators.required, Validators.min(0.0)]],
      test: [test, [Validators.required, Validators.min(0.0)]],
      ba: [ba, [Validators.required, Validators.min(0.0)]],
      cong: [{ value: cong, disabled: true }],
    });
  }

  private getValueForSave() {
    this.input.maDuAn = this.formData.get('maDuAn')?.value;
    this.input.tenDuAn = this.formData.get('tenDuAn')?.value;
    this.input.giaTriHD = this.formData.get('giaTriHD')?.value;
    this.input.soHopDong = this.formData.get('soHopDong')?.value;
    this.input.khachHang = this.formData.get('khachHang')?.value;
    this.input.noiDungPhatTrien = this.formData.get('noiDungPhatTrien')?.value;
    this.input.ngayBatDau = this.formData.get('ngayBatDau')?.value;
    this.input.ngayKetThuc = this.formData.get('ngayKetThuc')?.value;
    this.input.ungDungDauCuoi = this.formData.get('ungDungDauCuoi')?.value.join(',');
    this.input.congNgheSuDung = this.formData.get('congNgheSuDung')?.value;
    this.input.quyTrinhPhatTrien = this.formData.get('quyTrinhPhatTrien')?.value;
    this.input.quanLyDuAnId = this.formData.get('quanLyDuAn')?.value?.id;
    this.input.luongCoSo = this.formData.get('luongCoSo')?.value;
    this.input.banGiaoDungHan = this.formData.get('banGiaoDungHan')?.value;
    this.input.hieuQuaSuDungNhanSu = this.formData.get('hieuQuaSuDungNhanSu')?.value;
    this.input.noLucKhacPhucLoi = this.formData.get('noLucKhacPhucLoi')?.value;
    this.input.mucDoHaiLongCuaKhachHang = this.formData.get('mucDoHaiLongCuaKhachHang')?.value;
    this.input.mucDoloiBiPhatHien = this.formData.get('mucDoLoiBiPhatHien')?.value;
    this.input.mucDoLoiUAT = this.formData.get('mucDoLoiUAT')?.value;
    this.input.tyLeThucHienDungQuyTrinh = this.formData.get('tyLeThucHienDungQuyTrinh')?.value;
    this.input.nangSuatTaoTestcase = this.formData.get('nangSuatTaoTestcase')?.value;
    this.input.nangSuatThuThiTestcase = this.formData.get('nangSuatThuThiTestcase')?.value;
    this.input.nangSuatDev = this.formData.get('nangSuatDev')?.value;
    this.input.nangSuatVietUT = this.formData.get('nangSuatVietUT')?.value;
    this.input.nangSuatThucThiUT = this.formData.get('nangSuatThucThiUT')?.value;
    this.input.nangSuatBA = this.formData.get('nangSuatBA')?.value;
    this.input.giaTriHopDong = this.formData.get('giaTriHopDong')?.value;
    this.input.chiPhiABH = this.formData.get('chiPhiABH')?.value;
    this.input.chiPhiOpexPhanBo = this.formData.get('chiPhiOpexPhanBo')?.value;
    this.input.chiPhiLuongDuKien = this.formData.get('chiPhiLuongDuKien')?.value;
    this.input.chiPhiLuongThucTe = this.formData.get('chiPhiLuongThucTe')?.value;
    this.input.laiDuKien = this.formData.get('laiDuKien')?.value;
    this.input.laiThucTe = this.formData.get('laiThucTe')?.value;

    this.input.module = [];
    // Modules
    if (this.formData.get('modules')['controls'].length > 0) {
      for (const form of this.formData.get('modules')['controls']) {
        const item = form.getRawValue();
        const module = {} as ModuleDto;
        module.tenModule = item.tenModule;
        module.pm = item.pm;
        module.dev = item.dev;
        module.ba = item.ba;
        module.test = item.test;
        module.tongThoiGian = Number(item.cong.toFixed(2));
        // module.changeRequest = item.changeRequest;
        // module.soThuTu = index;
        this.input.module.push(module);
      }
    }
  }

}

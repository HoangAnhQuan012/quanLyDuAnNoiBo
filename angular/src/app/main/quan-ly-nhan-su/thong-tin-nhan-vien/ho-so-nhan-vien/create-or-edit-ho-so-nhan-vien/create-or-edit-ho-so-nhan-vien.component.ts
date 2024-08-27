import { Component, Injector, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LookupTableDto } from '@proxy/global/dtos';
import { GioiTinhConsts } from '@proxy/ho-so-nhan-vien';
import { HoSoNhanVienService } from '@proxy/thong-tin-chung/quan-ly-nhan-vien';
import { HoSoNhanVienDto } from '@proxy/thong-tin-chung/quan-ly-nhan-vien/dtos';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { finalize, forkJoin } from 'rxjs';
import { AppComponentBase } from 'src/app/shared/app.component-base';
import { CommonComponent } from 'src/app/shared/validation/common.component';
import { ValidationComponent } from 'src/app/shared/validation/validation-message.component';

@Component({
  selector: 'app-create-or-edit-ho-so-nhan-vien',
  templateUrl: './create-or-edit-ho-so-nhan-vien.component.html',
  styleUrls: ['./create-or-edit-ho-so-nhan-vien.component.scss']
})
export class CreateOrEditHoSoNhanVienComponent extends AppComponentBase implements OnInit {

  formData: FormGroup;
  loading = false;
  input = {} as HoSoNhanVienDto;
  gioiTinhOptions: any[] = [];
  isEdit = false;
  id: any;
  isView = false;

  users: LookupTableDto[] = [];
  phongBans: LookupTableDto[] = [];
  danTocs: LookupTableDto[] = [];
  chucDanhs: LookupTableDto[] = [];
  caLamViecs: LookupTableDto[] = [];
  hoSoValue: any;

  constructor(
    injector: Injector,
    private _fb: FormBuilder,
    private dialogRef: DynamicDialogRef,
    private dialogConfig: DynamicDialogConfig,
    private _hoSoNhanVienService: HoSoNhanVienService
  ) {
    super(injector);
   }

  ngOnInit() {
    this._initForm();
    this.isEdit = this.dialogConfig?.data?.isEdit;
    this.id = this.dialogConfig?.data?.id;
    this.isView = this.dialogConfig?.data?.isView;
    this.gioiTinhOptions = [
      { id: GioiTinhConsts.Nam, displayName: 'Nam' },
      { id: GioiTinhConsts.Nu, displayName: 'Nữ' }
    ];
    forkJoin([
      this._hoSoNhanVienService.getAllUser(),
      this._hoSoNhanVienService.getAllPhongBan(),
      this._hoSoNhanVienService.getAllDanToc(),
      this._hoSoNhanVienService.getAllChucDanh()
    ]).subscribe(([users, phongBans, danTocs, chucDanhs]) => {
      this.users = users;
      this.phongBans = phongBans;
      this.danTocs = danTocs;
      this.chucDanhs = chucDanhs;
      if (this.id) {
        this._hoSoNhanVienService.getHoSoNhanVienById(this.id)
        .subscribe((res) => {
          this.hoSoValue = res;
          this.setValueForEdit();
          if (this.isView) {
            this.formData.disable();
          }
        });
      }
    });
  }

  _initForm() {
    this.formData = this._fb.group({
      nguoiDung: [undefined, [Validators.required]],
      maNhanVien: ['', [Validators.required]],
      tenNhanVien: ['', [Validators.required]],
      ngaySinh: ['', [Validators.required]],
      gioiTinh: [undefined, [Validators.required]],
      danToc: [undefined, [Validators.required]],
      cmnd: [''],
      ngayCapCmnd: [''],
      noiCapCmnd: [''],
      noiSinh: ['', [Validators.required]],
      ngayVaoLam: ['', [Validators.required]],
      chucDanh: [undefined, [Validators.required]],
      phongBan: [undefined],
      soDienThoai: ['', [Validators.required]],
      hoChieu: [''],
      email: ['', [Validators.required, ValidationComponent.checkEmail]],
      maSoThue: [''],
      ngayNghiViec: ['']
    })
  }

  close() {
    this.dialogRef.close();
  }

  save() {
    if (CommonComponent.getControlErr(this.formData) === '') {
      this.loading = true;
      this.getValueForSave();
      if (this.isEdit) {
        this.input.id = this.id;
        this._hoSoNhanVienService.updateHoSoNhanVien(this.input)
        .pipe(
          finalize(() => {
            this.loading = false;
          })
        ).subscribe((res) => {
          if (res) {
            this.showUpdateSuccessMessage('Cập nhật hồ sơ thành công');
            this.dialogRef.close({ data: true });
          } else {
            this.showErrorMessage('Mã nhân viên đã tồn tại');
          }
        }
        )
      } else {
        this._hoSoNhanVienService.createHoSoNhanVien(this.input)
        .pipe(
          finalize(() => {
            this.loading = false;
          })
        ).subscribe(() => {
          this.showCreateSuccessMessage('Thêm mới hồ sơ thành công');
          this.dialogRef.close({ data: true });
        });
      }
    }
  }

  private getValueForSave() {
    this.input.userId = this.formData.get('nguoiDung').value?.id;
    this.input.maNhanVien = this.formData.get('maNhanVien').value;
    this.input.hoTen = this.formData.get('tenNhanVien').value;
    this.input.ngaySinh = this.formData.get('ngaySinh').value;
    this.input.gioiTinh = this.formData.get('gioiTinh').value?.id;
    this.input.danToc = this.formData.get('danToc').value?.id;
    this.input.cmnd = this.formData.get('cmnd').value;
    this.input.ngayCapCMND = this.formData.get('ngayCapCmnd').value;
    this.input.noiCapCMND = this.formData.get('noiCapCmnd').value;
    this.input.noiSinh = this.formData.get('noiSinh').value;
    this.input.ngayVaoLam = this.formData.get('ngayVaoLam').value;
    this.input.chucDanhId = this.formData.get('chucDanh').value?.id;
    this.input.phongBanId = this.formData.get('phongBan').value?.id;
    this.input.soDienThoai = this.formData.get('soDienThoai').value;
    this.input.hoChieu = this.formData.get('hoChieu').value;
    this.input.email = this.formData.get('email').value;
    this.input.maSoThue = this.formData.get('maSoThue').value;
    this.input.ngayNghiViec = this.formData.get('ngayNghiViec').value;
  }

  private setValueForEdit() {
    this.formData.get('nguoiDung').setValue(this.users.find(x => x.id === this.hoSoValue.userId));
    this.formData.get('maNhanVien').setValue(this.hoSoValue.maNhanVien);
    this.formData.get('tenNhanVien').setValue(this.hoSoValue.hoTen);
    this.formData.get('ngaySinh').setValue(CommonComponent.getDateForEditFromMoment(this.hoSoValue.ngaySinh));
    this.formData.get('gioiTinh').setValue(this.gioiTinhOptions.find(x => x.id === this.hoSoValue.gioiTinh));
    this.formData.get('danToc').setValue(this.danTocs.find(x => x.id === this.hoSoValue.danToc));
    this.formData.get('cmnd').setValue(this.hoSoValue.cmnd);
    this.formData.get('ngayCapCmnd').setValue(CommonComponent.getDateForEditFromMoment(this.hoSoValue.ngayCapCMND));
    this.formData.get('noiCapCmnd').setValue(this.hoSoValue.noiCapCMND);
    this.formData.get('noiSinh').setValue(this.hoSoValue.noiSinh);
    this.formData.get('ngayVaoLam').setValue(CommonComponent.getDateForEditFromMoment(this.hoSoValue.ngayVaoLam));
    this.formData.get('chucDanh').setValue(this.chucDanhs.find(x => x.id === this.hoSoValue.chucDanhId));
    this.formData.get('phongBan').setValue(this.phongBans.find(x => x.id === this.hoSoValue.phongBanId));
    this.formData.get('soDienThoai').setValue(this.hoSoValue.soDienThoai);
    this.formData.get('hoChieu').setValue(this.hoSoValue.hoChieu);
    this.formData.get('email').setValue(this.hoSoValue.email);
    this.formData.get('maSoThue').setValue(this.hoSoValue.maSoThue);
    this.formData.get('ngayNghiViec').setValue(CommonComponent.getDateForEditFromMoment(this.hoSoValue.ngayNghiViec));
  }

}

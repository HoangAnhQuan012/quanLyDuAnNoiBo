import { Component, Injector, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoaiHopDongService, ThoiHanLoaiHopDongConst } from '@proxy/danh-muc';
import { LoaiHopDongDto } from '@proxy/danh-muc/dtos';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { finalize } from 'rxjs';
import { AppComponentBase } from 'src/app/shared/app.component-base';
import { CommonComponent } from 'src/app/shared/validation/common.component';

@Component({
  selector: 'app-create-or-edit-loai-hop-dong',
  templateUrl: './create-or-edit-loai-hop-dong.component.html',
  styleUrls: ['./create-or-edit-loai-hop-dong.component.scss']
})
export class CreateOrEditLoaiHopDongComponent extends AppComponentBase implements OnInit {

  formData: FormGroup;
  loading = false;
  isView = false;
  isEdit = false;
  id: any;
  disableButton = false;
  thoiHanHopDong = [
    { id: ThoiHanLoaiHopDongConst.VoThoiHan, displayName: 'Vô thời hạn' },
    { id: ThoiHanLoaiHopDongConst.HaiThang, displayName: '1 tháng' },
    { id: ThoiHanLoaiHopDongConst.MotNam, displayName: '1 năm' },
    { id: ThoiHanLoaiHopDongConst.HaiNam, displayName: '2 năm' }
  ];

  loaiHopDong = {} as LoaiHopDongDto;

  constructor(
    injector: Injector,
    private _fb: FormBuilder,
    private dialogRef: DynamicDialogRef,
    private dialogConfig: DynamicDialogConfig,
    private _loaiHopDongService: LoaiHopDongService,
  ) {
    super(injector);
   }

  ngOnInit() {
    this._initForm();
    this.id = this.dialogConfig?.data?.id;
    this.isView = this.dialogConfig?.data?.isView;
    this.isEdit = this.dialogConfig?.data?.isEdit;
    if(this.id) {
      this._loaiHopDongService.getLoaiHopDongByIdById(this.id)
      .subscribe(res => {
        this.loaiHopDong = res;
        this.setValueForEdit();
        if(this.isView) {
          this.formData.disable();
        }
      });
    }
  }

  _initForm() {
    this.formData = this._fb.group({
      maLoaiHopDong: ['', [Validators.required]],
      tenLoaiHopDong: ['', [Validators.required]],
      thoiHanHopDong: [undefined, [Validators.required]],
    });
  }

  close() {
    this.dialogRef.close();
  }

  save() {
    if(CommonComponent.getControlErr(this.formData) === '') {
      this.getValueForSave();
      if (this.isEdit) {
        this.loaiHopDong.id = this.id;
        this._loaiHopDongService.updateLoaiHopDongByInput(this.loaiHopDong)
        .pipe(
          finalize(() => {
            this.loading = false;
          })
        ).subscribe((res) => {
          this.showUpdateSuccessMessage('Cập nhật thành công');
          this.dialogRef.close({ data: true });
        });
      } else {
        this._loaiHopDongService.createLoaiHopDongByInput(this.loaiHopDong)
        .pipe(
          finalize(() => {
            this.loading = false;
          })
        ).subscribe((res) => {
          this.showCreateSuccessMessage('Thêm mới thành công');
          this.dialogRef.close({ data: true });
        });
      }
    }
  }

  private setValueForEdit() {
    this.formData.get('maLoaiHopDong')?.setValue(this.loaiHopDong.maLoaiHopDong);
    this.formData.get('tenLoaiHopDong')?.setValue(this.loaiHopDong.tenLoaiHopDong);
    this.formData.get('thoiHanHopDong')?.setValue(this.thoiHanHopDong.find(x => x.id === this.loaiHopDong.thoiHanLoaiHopDong));
  }

  private getValueForSave() {
    this.loaiHopDong.maLoaiHopDong = this.formData.get('maLoaiHopDong')?.value;
    this.loaiHopDong.tenLoaiHopDong = this.formData.get('tenLoaiHopDong')?.value;
    this.loaiHopDong.thoiHanLoaiHopDong = this.formData.get('thoiHanHopDong')?.value?.id;
  }

}

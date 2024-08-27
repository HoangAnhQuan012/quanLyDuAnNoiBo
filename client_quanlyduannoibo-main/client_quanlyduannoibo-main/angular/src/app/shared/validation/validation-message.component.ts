import { LocalizationService } from '@abp/ng.core';
import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { CommonComponent } from './common.component';

@Component({
  selector: '<validation>',
  template: `
     <div class="validation-text">
        <div *ngIf="control?.touched || control?.dirty">
            <span style="font-size: 12px !important; color: #DC3545;">
                {{message}}
            </span>
        </div>
    </div>
    `,
  styles: [
    `
            .validation-text{
                text-align: start;
            }
        `
  ]
})
export class ValidationComponent {

  @Input() control;
  constructor(private localizationService: LocalizationService) { }
  get message() {
    try {
      if (this.control.errors) {
        for (const err in this.control.errors) {
          if (this.control.errors.hasOwnProperty(err)) {
            return this.getErrorMessage(err);
          }
        }
      }
      return '';
    } catch (error) {
      return '';
    }
  }

  public static checkValidatePassword(control: AbstractControl) {
    try {
      if (control.value != null && control.value != "") {
        if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@`#\$%\^&\*\(\)_\-~+=,\/?\[\]{}\\|'";.:><])[0-9a-zA-Z!@`#\$%\^&\*\(\)_\-~+=,\/?\[\]{}\\|'";.:><]{8,}$/.test(control.value)) {
          return { checkValidatePassword: true };
        }
      }
      return null;
    }
    catch (error) {
    }
  }

  public static checkEmail(control: AbstractControl) {
    try {
      // nếu k phai số trả về true
      const trimmedValue = CommonComponent.regexFormat(control.value); // Loại bỏ khoảng trắng ở đầu và cuối chuỗi
      if (trimmedValue) {
        if (!/^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(trimmedValue)) {
          return { email: true };
        } else {
          return null;
        }
      }
      return null;
    } catch (error) {

    }
  }

  public static checkSpace(control: AbstractControl) {
    try {
      // nếu k phai số trả về true
      if (control.value != null) {
        if (control.value.trim().length == 0) {
          control.setValue(control.value.trim());
          return { required: true };
        } else {
          control.setValue(control.value.trimStart());
        }
      }
      return null;
    } catch (error) {

    }
  }

  // check password confirm is match password
  public static checkPassworkConfirm(control: AbstractControl) {
    try {
      if (control.value != null) {
        if (control.value != control.parent?.get('matKhau')?.value) {
          return { checkPassworkConfirm: true };
        } else {
          return null;
        }
      }
      return null;
    } catch (error) {

    }
  }

  getErrorMessage(err: any) {
    const messages = {
      'required': 'Đây là trường bắt buộc',
      'email': 'Email không đúng định dạng',
      'checkPassworkConfirm': "Mật khẩu xác nhận không đúng",
      'checkValidatePassword': 'Mật khẩu tối thiểu 8 ký tự bao gồm chữ hoa, thường, số và ký tự đặc biệt',
      'passwordPattern': this.localizationService.instant('::Validation:PasswordPattern'),
      'passwordMismatch': this.localizationService.instant('::Validation:PasswordMismatch'),
      'emailExists': this.localizationService.instant('::Account:ExistedEmail'),
      'maxlength': this.localizationService.instant('::Message:Maxlength') + this.control?.errors?.['maxlength']?.requiredLength + this.localizationService.instant('::Message:Characters'),
      'lessThan': this.localizationService.instant('::Student:Guidance:MustBeLessThan'),
    };
    return messages[err];
  }

  public static validatePassword(control: AbstractControl) {
    try {
      if (control.value != null) {
        if (!/^(?=.*?[A-Z]).{7,}$/.test(control.value)) {
          return { passwordPattern: true };
        } else {
          return null;
        }
      }
      return null;
    } catch (error) {

    }
  }
}

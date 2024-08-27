import { FormArray, FormControl, FormGroup } from '@angular/forms';
import * as $ from 'jquery';
import * as moment from 'moment';

export class CommonComponent {
  // truyền vào 1 formGroup để lấy trả vể chuôi = tên control có lỗi
  public static getControlErr(form: FormGroup) {
    let check = '';
    Object.keys(form.controls).forEach(field => {
      const control = form.get(field);
      if (control instanceof FormArray) {
        const x = this.getControlArrErr(control);
        if (check === '') {
          check = x;
        }
      } else if (control.errors && check === '') {
        check = field;
      }
    });

    if (check !== '') {
      for (const control in form.controls) {
        if (form.controls.hasOwnProperty(control)) {
          form.get(control).markAsDirty({ onlySelf: true });
        }
      }
      CommonComponent.autoFocus(check);
      return check;
    } else {
      return '';
    }
  }

  public static getControlArrErr(form: FormArray): string {
    let check: string = '';

    form.controls.forEach((item: FormGroup, yi: number) => {
      if (item.invalid) {
        Object.keys(item.controls).some((control_yi) => {
          if (item.get(control_yi).errors) {
            check = `${control_yi}_${yi}`;
            return true; // Dừng vòng lặp nếu tìm thấy lỗi
          }
          return false;
        });
      }
    });

    if (check) {
      form.controls.forEach((element: FormGroup) => {
        Object.keys(element.controls).forEach((control_xi) => {
          const control = element.get(control_xi);
          if (control instanceof FormControl) {
            control.markAsTouched();
          }
        });
      });
    }

    return check;
  }

  // Truyền vào id để focus
  public static autoFocus(id: string) {
    $(`#${id}`).on("focus", function () { });
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  public static regexFormat(str: string) {
    return str.trim();
  }

  public static getTimeEditFromString(time: string) {
    return time !== '' ? new Date('2024-01-01 ' + time) : null;
}

public static getDateForEditFromMoment(date: moment.Moment, format = 'YYYY/MM/DD') {
  return date ? new Date(moment(date).format(format)) : null;
}
}


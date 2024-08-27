import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: '<app-label-validation>',
  template: ` <label style='font-weight: 400 !important;'
                    [class]="control?.errors && ( control?.touched || control?.dirty)  ? 'text-danger' : 'text-ok'"  id="control">{{title}}
                </label>
                <label style='color: #dc3545 !important;'>{{titleValidate}}
                </label>
    `
})
export class LabelValidationComponent {
  @Input() form: FormGroup;
  @Input() control: FormControl;
  @Input() title: '';
  @Input() titleValidate: '';
}

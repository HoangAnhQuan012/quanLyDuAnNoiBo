import { AuthService, LoginParams } from '@abp/ng.core';
import { Component, Injector, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, finalize, throwError } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { AppComponentBase } from 'src/app/shared/app.component-base';
import { CommonComponent } from 'src/app/shared/validation/common.component';
import { ValidationComponent } from 'src/app/shared/validation/validation-message.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }

        .h-32 {
          height: 50px !important;
        }

        .custom-center {
          display: flex;
          justify-content: center;
          align-items: center;
        }
    `]
})
export class LoginComponent extends AppComponentBase implements OnInit {
  formData: FormGroup;
  loading = false;

  constructor(
    injector: Injector,
    public layoutService: LayoutService,
    private _fb: FormBuilder,
    private _router: Router,
    private _authService: AuthService
  ) {
    super(injector);
    // if (this.hasLoggedIn) {
    //   this._router.navigateByUrl('/');
    // }
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.formData = this._fb.group({
      Email: ['', [Validators.required]],
      Password: ['', [Validators.required]],
    });
  }

  login() {
    if (CommonComponent.getControlErr(this.formData) === '') {
      this.loading = true;
      const email = CommonComponent.regexFormat(this.formData.controls.Email.value);
      const password = this.formData.controls.Password.value;
      let requestLogin: LoginParams = {
        username: email,
        password: password,
        rememberMe: true,
        redirectUrl: '/main/dashboard'
      };
      this._authService.login(requestLogin)
        .pipe(
          finalize(() => {
            this.loading = false;
          }),
          catchError((error) => {
            if (error.status === 400) {
              if (error?.error?.changePasswordToken && error?.error?.userId) {
                this._router.navigateByUrl(`auth/`)
              } else {
                this.showErrorMessage('Đăng nhập thất bại');
              }
            }
            return throwError(error);
          })
        ).subscribe(() => {
          console.log('login success');
        });
    }
  }
}

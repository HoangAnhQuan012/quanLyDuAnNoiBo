import { PermissionService } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  UrlTree,
} from '@angular/router';
import { OAuthService } from 'angular-oauth2-oidc';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  constructor(private oauthService: OAuthService, private router: Router, private _permissionChecker: PermissionService) { }

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> | boolean | UrlTree {
    const hasValidAccessToken = this.oauthService.hasValidAccessToken();
    if (!hasValidAccessToken) {
      this.router.navigate(['/auth/login']);
      return false;
    }

    if (this._permissionChecker.getGrantedPolicy(route.data['requiredPolicy'])) {
      return true;
    }

    this.router.navigate(['/notfound']);
    return false;
  }
}

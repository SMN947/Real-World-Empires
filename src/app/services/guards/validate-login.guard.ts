import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../login.service';
import { Apps } from '../apps.service';

@Injectable({
  providedIn: 'root'
})
export class ValidateLoginGuard implements CanActivate {

  constructor(private login: LoginService, private router: Router, private apps: Apps) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    if (this.login.getUser()) {

      if (this.apps.valAccess(state.url)) {
        //this.analytics.track('validate-login.guard.ts', 'LoginGuard', 'Success')
        return true;
      } else {
        setTimeout(() => {
          //this.toastr.danger('You are not allowed to navigate to ' + state.url, 'NE Portal');
        }, 1000);
        this.router.navigate(['/ne/main']);
        return false;
      }
    } else {
      this.router.navigate(['/login', {GoTo: state.url}]);
      return false;
    }
  }
}

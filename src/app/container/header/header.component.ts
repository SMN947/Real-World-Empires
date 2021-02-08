import { Component, OnDestroy, OnInit } from '@angular/core';
import { map, takeUntil, filter } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

interface ProfileMenu {
  title: string;
  icon: Icon;
  target: string;
}

interface Icon {
  icon: string;
  pack: string;
}

interface UserInfo {
  nombre: string;
  username: string;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  userPictureOnly = false;
  user: any;
  public userInfo: UserInfo;

  public profileMenu: ProfileMenu[] = [
    /*  {
        title: 'Profile',
        icon: { icon: 'user-circle', pack: 'fa' },
        target: 'main/profile',
      },*/
    {
      title: 'Log Out',
      icon: { icon: 'sign-out-alt', pack: 'fa' },
      target: 'login',
    },
  ];

  constructor(
    private router: Router,
    private Login: LoginService
  ) { }

  ngOnInit(){ }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
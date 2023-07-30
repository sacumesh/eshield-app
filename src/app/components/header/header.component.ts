import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { lastValueFrom } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  userContextMenu = {
    tag: 'user-context-menu',
    items: [{ title: 'Profile',  }, { title: 'Log out' }],
  };
  constructor(
    private _sidebarService: NbSidebarService,
    private _menuService: NbMenuService,
    private _authService: AuthenticationService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this._menuService
      .onItemClick()
      .pipe(
        filter(({ tag }) => tag === 'user-context-menu'),
        map(({ item: { title } }) => title)
      )
      .subscribe((title) => {
        if (title === 'Log out') {
          this.handleLogout();
        }
      });
  }

  toggleSidebar(): boolean {
    this._sidebarService.toggle(true, 'menu-sidebar');
    // this.layoutService.changeLayoutSize();

    return false;
  }

  navigateHome() {
    this._menuService.navigateHome();
    return false;
  }


  async handleLogout() {
    const booleanObservable = this._authService.logout();
    try {
      const res = await lastValueFrom(booleanObservable);
      if (res) {
        this._router.navigate(['/auth']);
      }
    } catch (error) {
      console.error(error);
    }
   
  }
}

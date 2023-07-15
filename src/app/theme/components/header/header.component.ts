import { Component, OnInit } from '@angular/core';
import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  userContextMenu = {
    tag: 'user-context-menu',
    items: [{ title: 'Profile' }, { title: 'Log out' }],
  };
  constructor(
    private _sidebarService: NbSidebarService,
    private _menuService: NbMenuService
  ) {}

  ngOnInit(): void {
    this._menuService
      .onItemClick()
      .pipe(
        filter(({ tag }) => tag === 'user-context-menu'),
        map(({ item: { title } }) => title)
      )
      .subscribe(console.log);
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
}

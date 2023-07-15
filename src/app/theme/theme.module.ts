import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { OneColumnComponent } from './layouts/one-column/one-column.component';
import { TwoColumnsComponent } from './layouts/two-columns/two-columns.component';
import { ThreeColumnsComponent } from './layouts/three-columns/three-columns.component';
import {
  NbActionsModule,
  NbContextMenuModule,
  NbIconModule,
  NbLayoutModule,
  NbMenuModule,
  NbSearchModule,
  NbSidebarModule,
  NbThemeModule,
  NbUserModule,
} from '@nebular/theme';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    OneColumnComponent,
    TwoColumnsComponent,
    ThreeColumnsComponent,
  ],
  imports: [
    CommonModule,
    NbThemeModule.forRoot({ name: 'cooperate' }),
    NbLayoutModule,
    NbSidebarModule,
    NbIconModule,
    NbActionsModule,
    NbSearchModule,
    NbUserModule,
    NbContextMenuModule,
    NbMenuModule.forRoot(),
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    OneColumnComponent,
    TwoColumnsComponent,
    ThreeColumnsComponent,
  ],
})
export class ThemeModule {}

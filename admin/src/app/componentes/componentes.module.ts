import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopbarComponent } from './topbar/topbar.component';
import { FooterComponent } from './footer/footer.component';
import { MenuComponent} from './menu/menu.component';
import { SubmenuComponent } from './submenu/submenu.component';
import { CardModule } from 'primeng/primeng';

@NgModule({
  imports: [
    CommonModule,
    CardModule
  ],
  declarations: [
    SubmenuComponent,
    TopbarComponent,
    FooterComponent,
    MenuComponent,
    SubmenuComponent
  ],
  exports: [
    SubmenuComponent,
    TopbarComponent,
    FooterComponent,
    MenuComponent
  ]
})
export class ComponentesModule { }

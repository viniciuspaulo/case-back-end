import {Component, Input, OnInit} from '@angular/core';
import {MenuItem} from 'primeng/primeng';
import { AppComponent} from '../../app.component';
import { menuList } from '../../config/MenuConfig';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  @Input() reset: boolean;

  model: MenuItem[];

  constructor(public app: AppComponent) {}

  ngOnInit() {
      this.model = menuList;
  }

  changeTheme(theme) {
      const themeLink: HTMLLinkElement = <HTMLLinkElement> document.getElementById('theme-css');
      const layoutLink: HTMLLinkElement = <HTMLLinkElement> document.getElementById('layout-css');

      themeLink.href = 'assets/theme/theme-' + theme + '.css';
      layoutLink.href = 'assets/layout/css/layout-' + theme + '.css';
  }
}

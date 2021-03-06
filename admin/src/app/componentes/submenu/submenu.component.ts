import { Component, OnInit, Input } from '@angular/core';
import {trigger, state, style, transition, animate} from '@angular/animations';
import {Location} from '@angular/common';
import {Router} from '@angular/router';
import { MenuItem } from 'primeng/primeng';
import { AppComponent } from '../../app.component';
import { GenericUtil } from '../../util/GenericUtil';

@Component({
  selector: '[app-submenu]',
  templateUrl: './submenu.component.html',
  styleUrls: ['./submenu.component.scss'],
  animations: [
    trigger('children', [
        state('hidden', style({
            height: '0px'
        })),
        state('visible', style({
            height: '*'
        })),
        transition('visible => hidden', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')),
        transition('hidden => visible', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
    ])
]
})
export class SubmenuComponent extends GenericUtil implements OnInit{

  @Input() item: MenuItem;

  @Input() root: boolean;

  @Input() visible: boolean;

  _reset: boolean;

  activeIndex: number;

  constructor(public app: AppComponent, public router: Router, public location: Location) {
      super();
  }

  ngOnInit() {
    this.verifyLogado();
  }

  itemClick(event: Event, item: MenuItem, index: number) {
      // avoid processing disabled items
      if (item.disabled) {
          event.preventDefault();
          return true;
      }

      // activate current item and deactivate active sibling if any
      this.activeIndex = (this.activeIndex === index) ? null : index;

      // execute command
      if (item.command) {
          item.command({originalEvent: event, item: item});
      }

      // prevent hash change
      if (item.items || (!item.url && !item.routerLink)) {
          setTimeout(() => {this.app.layoutMenuScrollerViewChild.moveBar(); }, 450);
          event.preventDefault();
      }

      // hide menu
      if (!item.items) {
          if (this.app.isHorizontal()) {
              this.app.resetMenu = true;
          } else {
              this.app.resetMenu = false; }

          this.app.overlayMenuActive = false;
          this.app.staticMenuMobileActive = false;
      }

      if(item.routerLink){
        this.router.navigate(item.routerLink);
      }
  }

  isActive(index: number): boolean {
      return this.activeIndex === index;
  }

  @Input() get reset(): boolean {
      return this._reset;
  }

  set reset(val: boolean) {
      this._reset = val;

      if (this._reset && this.app.isHorizontal()) {
          this.activeIndex = null;
      }
  }

}

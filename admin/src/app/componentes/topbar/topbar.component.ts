import { Component, OnInit } from '@angular/core';
import {AppComponent} from '../../app.component';
import { GenericUtil } from '../../util/GenericUtil';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent extends GenericUtil implements OnInit {

  constructor(public app: AppComponent, public router:Router) {
    super();
  }

  ngOnInit() {
    this.verifyLogado();
  }

  sair(){
    this.logado = false;
    localStorage.removeItem('_token_tookad');
    localStorage.removeItem('_token_tookad_t');
    this.router.navigate(['/login']);
  }

}

import { Component, OnInit, AfterViewInit } from '@angular/core';
import { GenericUtil } from '../../util/GenericUtil';
import { Router } from '@angular/router';
import { RestService } from '../../servicos/rest.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends GenericUtil implements AfterViewInit {
  
  public empresas:any = {};
  public textoPesquisa:string = null;

  constructor(public rest: RestService, public router: Router) {
    super();
  }
  
  ngAfterViewInit(): void {
    this.loading = true;
    this.rest.buscar("yielp").subscribe((empresas:any) => {
      this.empresas = empresas;
      this.loading = false;
    })
  }


  pesquisar() {
    this.loading = true;
    this.rest.buscar(`yielp/${this.textoPesquisa}`).subscribe((empresas:any) => {
      this.empresas = empresas;
      this.loading = false;
    })
  }

}

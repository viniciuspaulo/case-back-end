import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { GenericUtil } from '../../util/GenericUtil';
import { RestService } from '../../servicos/rest.service';
import { Login } from '../../interface/Login';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends GenericUtil implements AfterViewInit {

  public formulario: FormGroup;
  public formularioEsqueci: FormGroup;

  public loading = false;
  public dados:Login = new Login();

  public page:number = 0;
  public emailEsquecisenha:string = null;
  public message;

  
  constructor(
    // private msgService: MessagingService, 
    public rest: RestService, 
    public router: Router) {

      super();

      this.formulario = new FormGroup({
        usuario : new FormControl('',Validators.required),
        senha : new FormControl('',Validators.required),
      });

      this.formularioEsqueci = new FormGroup({
        usuario : new FormControl('',Validators.email),
      });

      this.formulario.enable({ emitEvent: false });
      this.formularioEsqueci.enable({ emitEvent: false });
   }


  ngAfterViewInit(): void {
    this.socket.disconnect();
  }
  

  logar(){
    this.clearToken();
    this.router.navigate(['/estabelecimentos']);
    return;
  }


  esqueciSenha(){
    this.loading = true;
    if(!this.emailEsquecisenha){
      this.growl('error','Login', `Digite um email`);
      return;
    }

    this.rest.post("recuperarSenha",{email : this.emailEsquecisenha})
    .subscribe((enviou:any) =>{
      if(enviou){
        this.growl('success','Email', `email enviado com sucesso`);
        this.page = 0;
      }else{
        this.growl('error','Email', `Não foi possivel enviar email`);
      }
      this.loading = false;
    },erro =>{
      this.growl('error','Email', `Não foi possivel enviar email`);
      this.loading = false;
    })
  }

}

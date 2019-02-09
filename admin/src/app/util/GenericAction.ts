import { GenericUtil } from "./GenericUtil";
import { RestService } from "../servicos/rest.service";
import { FormGroup } from "@angular/forms";
import { ConfirmationService } from "primeng/primeng";
import { Crud } from "../interface/Crud";
import { OnInit, Output, OnDestroy } from "@angular/core";


import { HookService } from '../servicos/hook.service';


interface ObjectGeneric<T> {
  new (): T;
}

export class GenericAction<T> extends GenericUtil implements OnInit, Crud<T> {

  public formulario: FormGroup;
  public exitente: boolean;
  public selecionado:any;
  public object:any;


  public listagem:T[] = [];
  public item:T;

  //Paginacao
  public paginacaoPagina:number = 1;
  public paginacaoTotal:number = 0;

  constructor(
    public page_s:string,
    public page_p:string,
    public point:string,
    public rest: RestService, 
    public confirmationService: ConfirmationService,
    object: ObjectGeneric<T>){
      super();

      this.object = object;
  }

  ngOnInit() {
    this.buscar();
  }
  
  buscar(event:any = null){
    if (event) {
      this.paginacaoPagina = (event.page + 1)
    }
    this.loading = true;
    this.rest.buscar(`${this.point}/all/${this.paginacaoPagina}`)
    .subscribe((dados:any) => {

      this.listagem = dados.listagem;
      this.paginacaoPagina = dados.pagina;
      this.paginacaoTotal = dados.total;

      this.loading = false;
    },erro =>{
      this.loading = false;
    });
  }
  
    selecionar(selecionado:any) {
      this.loading = true;
      this.lookBeforeSelecione()
      if (!selecionado) {
        this.loading = false;
        this.exitente = true;
        this.selecionado = new this.object();
        this.lookAfterSelecione()
      } else {
        this.rest.buscar(this.point+"/"+selecionado._id)
        .subscribe((item:T) =>{
          console.log(item)
          this.selecionado = item;
          this.lookAfterSelecione()
          this.exitente = true;
          this.loading = false;
        })
      }
  }
  
    criarAtualizar(selecionado:any,sair:boolean = true) {
      
      this.loading = true;
      if(!selecionado._id){
        //Criar

        this.lookBeforeSave();
        delete this.selecionado._id;
  
        this.rest.post(this.point,selecionado)
        .subscribe((item:T) =>{
          this.loading = false;

          if (sair) {
            this.cancelar();
          }

          this.lookAfterSave();
          this.growl('success',this.page_s,`Criado com sucesso`);
        },erro =>{
          this.loading = false;
          console.log(erro);
          this.growl('error',this.page_s,`Não foi possivel criar`);
        })
      }else{
        //Atualizar
        this.lookBeforeUdpate();
        selecionado.dataatualizado = new Date();
        this.rest.put(this.point,selecionado)
        .subscribe((item:T) =>{
          this.loading = false;
          if (sair) {
            this.cancelar();
          }

          this.lookAfterUdpate();
          this.growl('success',this.page_s,`Atualizado com sucesso`);
        },erro =>{
          this.loading = false;
          this.growl('error',this.page_s, `Não foi possivel atualizar`);
        })
      }
      return false;
    }
  
    excluir(selecionado: T,sair:boolean = true) {
      this.confirmationService.confirm({
          message: 'Deseja mesmo excluir ?',
          accept: () => {
            this.lookBeforeDelete();
            this.rest.delete(this.point,selecionado)
            .subscribe((Usuarios:T) =>{
              this.loading = false;
              if (sair) {
                this.cancelar();
              }
              this.growl('success',this.page_s,`Excluido com sucesso`);

              this.lookAfterDelete();
            },erro =>{
              this.loading = false;
              this.growl('error',this.page_s,`Não foi possivel excluir`);
            })
          }
      });
    }
  
  
    cancelar() {
      this.exitente = false;
      this.selecionado = null;
      this.buscar();
    }

    createObject<T>(c: {new(): T; }): T {
      return new c();
    }



    buscaSimples(campo:string,texto:string){
      if (texto.length === 0) {
        this.buscar();
      }
      if (texto.length > 3) {
        this.rest.buscar(`${this.point}/buscasimples/${campo}&${texto}`)
        .subscribe((listagem:T[]) => {
          this.listagem = listagem;
        },erro =>{ });
      }
    }


    lookBeforeSelecione(){}
    lookAfterSelecione(){}

    lookBeforeSave(){}
    lookBeforeUdpate(){}
    lookBeforeDelete(){}

    lookAfterSave(){}
    lookAfterUdpate(){}
    lookAfterDelete(){}
}
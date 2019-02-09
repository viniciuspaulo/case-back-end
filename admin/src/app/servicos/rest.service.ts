import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericUtil } from '../util/GenericUtil';

import { HookService } from '../servicos/hook.service';
@Injectable()
export class RestService extends GenericUtil{

  constructor(public http: HttpClient) { 
    super();
  }

  buscar(endpoint){
    return this.http.get(this.url+endpoint);
  }

  put(endpoint,dados:any){
    HookService.get(`rest_atualizar_${endpoint}`).emit(dados);
    return this.http.put(`${this.url}${endpoint}/${dados._id}`,dados);
  }

  post(endpoint,dados:any){
    HookService.get(`rest_criar_${endpoint}`).emit(dados);
    return this.http.post(this.url+endpoint,dados);
  }

  delete(endpoint,dados:any){
    HookService.get(`rest_excluir_${endpoint}`).emit(dados);
    return this.http.delete(`${this.url}${endpoint}/${dados._id}`);
  }

  buscarGRAPH(query){
    return this.http.get(this.urlGRAPH+query);
  }

}

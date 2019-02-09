import { FormGroup } from "@angular/forms";
import {Message} from 'primeng/components/common/api';

export interface Crud<T>{

    formulario:FormGroup;
    exitente:boolean;
    selecionado:T;
    listagem:T[];
    mensagens: Message[];

    buscar();
    selecionar(selecionado:T);
    criarAtualizar(selecionado:T);
    excluir(selecionado:T);
    cancelar();


}
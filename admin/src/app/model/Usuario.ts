

export class Usuario {
    _id:any = null;
    nome:string = null;
    email:string = null;
    senha:string = null;

    ativo:Boolean = null;
    datacadastro:Date = new Date();
    dataatualizado:Date = new Date();
}
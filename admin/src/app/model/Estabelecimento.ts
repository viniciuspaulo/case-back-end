
export class Coordenadas {
    type : string = "Point"
    coordinates:any[] = [-22.909774,-43.200128];
}

export class  Estabelecimento{
    _id:any = null;
    nome:string = null;
    logo:string = null;
    cnpj:string = null;
    sobre:string = null;


    //Contato
    email:string
    emailOpcional:string = null;
    telefone:string = null;
    ceular:string = null;

    endereco:string = null;
    cep:string = null;
    numero:number = null;
    bairro:String = null;
    uf:string = null;
    cidade:string = null;
    pais:string = null;
    coordenadas : Coordenadas = new Coordenadas();
    distancia:any = null;

    segunda:Boolean = null;
    segunda_ini:string = null;
    segunda_fim:string = null;

    terca:Boolean = null;
    terca_ini:string = null;
    terca_fim:string = null;

    quarta:Boolean = null;
    quarta_ini:string = null;
    quarta_fim:string = null;

    quinta:Boolean = null;
    quinta_ini:string = null;
    quinta_fim:string = null;

    sexta:Boolean = null;
    sexta_ini:string = null;
    sexta_fim:string = null;

    sabado:Boolean = null;
    sabado_ini:string = null;
    sabado_fim:string = null;

    domingo:Boolean = null;
    domingo_ini:string = null;
    domingo_fim:string = null;

    site:string = null;
    instagram:string = null;
    facebook:string = null;
    whatsapp:string = null;
    messenger:string = null;
    youtube:string = null;
    linkedin:string = null;

    visualizacao:number = null;
    ranking:number = null;
    estrelas:number = null;

    //Config
    imagens:string[] = null;
    yielpId:string = null;

    ativo:Boolean = null;
    datacadastro:Date = new Date();
    dataatualizado:Date = new Date();
};
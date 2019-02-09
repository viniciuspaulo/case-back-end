import * as mongoose from 'mongoose';
const Schema:any = mongoose.Schema;

export class Coordenadas {
    type : string = "Point"
    coordinates:any[] = [];
}


export interface Estabelecimento{
    _id:any,
    nome:string,
    logo:string,
    cnpj:string,
    sobre:string,

    //Responsavel
    nomeContato:string,
    emailContato:string,
    telefoneContato:string,

    //Contato
    email:string
    emailOpcional:string,
    telefone:string,
    ceular:string,

    endereco:string,
    cep:string,
    numero:number,
    bairro:String,
    uf:string,
    cidade:string,
    pais:string,
    coordenadas : Coordenadas,

    segunda:Boolean,
    segunda_ini:string,
    segunda_fim:string,

    terca:Boolean,
    terca_ini:string,
    terca_fim:string,

    quarta:Boolean,
    quarta_ini:string,
    quarta_fim:string,

    quinta:Boolean,
    quinta_ini:string,
    quinta_fim:string,

    sexta:Boolean,
    sexta_ini:string,
    sexta_fim:string,

    sabado:Boolean,
    sabado_ini:string,
    sabado_fim:string,

    domingo:Boolean,
    domingo_ini:string,
    domingo_fim:string,

    site:string,
    instagram:string,
    facebook:string,
    whatsapp:string,
    messenger:string,
    youtube:string,
    linkedin:string,

    //Config
    imagens:string[],
    tokenFirebase:string,
    socketId:string,

    ativo:boolean,
    datacadastro:Date,
    dataatualizado:Date,
};

export const EstabelecimentoSchema = mongoose.model(
    'Estabelecimento', 
    new Schema({
        nome:{type:String, required : true},
        logo:String,
        cnpj:String,
        sobre:String,

        nomeContato:String,
        emailContato:String,
        telefoneContato:String,

        //Contato
        email:{type:String, required : true},
        emailOpcional:String,
        telefone:String,
        ceular:String,
        
        endereco:String,
        cep:String,
        numero:Number,
        bairro:String,
        uf:String,
        cidade:String,
        pais:String,
        coordenadas:{ type: {type: String, enum: "Point", default: "Point"}, coordinates: { type: [Number],   default: [0,0]} },

        segunda:Boolean,
        segunda_ini:String,
        segunda_fim:String,

        terca:Boolean,
        terca_ini:String,
        terca_fim:String,

        quarta:Boolean,
        quarta_ini:String,
        quarta_fim:String,

        quinta:Boolean,
        quinta_ini:String,
        quinta_fim:String,

        sexta:Boolean,
        sexta_ini:String,
        sexta_fim:String,

        sabado:Boolean,
        sabado_ini:String,
        sabado_fim:String,

        domingo:Boolean,
        domingo_ini:String,
        domingo_fim:String,

        site:String,
        instagram:String,
        facebook:String,
        whatsapp:String,
        messenger:String,
        youtube:String,
        linkedin:String,

        imagens:[String],
        yielpId:String,

        ativo:Boolean,
        datacadastro: { type : Date, default : Date.now() },
        dataatualizado: { type : Date, default : Date.now() },
    })
);
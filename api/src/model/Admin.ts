import * as mongoose from 'mongoose';
const Schema:any = mongoose.Schema;

export interface Admin{
    _id:any,
    nome:string,
    email:string,
    senha:string,
    ativo:boolean,
    datacadastro:Date,
    dataatualizado:Date,
};

export const AdminSchema = mongoose.model(
    'Admin', 
    new Schema({
        nome:String,
        email:String,
        senha:String,
        ativo:Boolean,
        datacadastro: { type : Date, default : Date.now() },
        dataatualizado: { type : Date, default : Date.now() },
    })
);
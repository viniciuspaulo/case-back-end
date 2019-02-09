import {JsonController, Param, Body, Get, Post, Put, Delete, NotFoundError, Req, Res} from "routing-controllers";

import * as moment from 'moment';
import * as jwt from 'jwt-simple';
import { config } from "../config";
import { AdminSchema, Admin } from "../model/Admin";

@JsonController("/login")
export class LoginController{

    public token:any;
    public expire = moment().add(30,'days').valueOf();


    @Post("/admin")
    async admin(@Req() req: any,@Res() res: any, @Body() dados: any): Promise<any> {
        try{
            let admin:any = await AdminSchema.findOne({email : dados.email},['nome','foto','senha','ativo'])
            if(!admin || admin.senha !== dados.senha || admin.ativo !== true) {
                return false;
            };
            let result = {
                nome : admin.nome,
                perfil : 1
            }
            return this.encodeJWT(admin._id,result);
        }catch(e){
            return false;
        }
    }

    encodeJWT(_id:string,result:any){
        this.token = jwt.encode({ 
            _id : _id,
            perfil : result.perfil,
            exp: this.expire
        },config.segredo)
        return { 
            token : this.token, 
            dados : result,
        };
    }

}
import { ExpressMiddlewareInterface, Middleware } from "routing-controllers";
import { config } from "../config";
import * as jwt from 'jwt-simple';

@Middleware({ type: "before" })
export class MyMiddlewareBefore implements ExpressMiddlewareInterface {

    async use(request: any, response: any, next?: (err?: any) => Promise<any>): Promise<any> {

        // let links:string[] = request.url.split(`/`)
        // let url = links[3]

        // let permitido = config.urlsPermitidas.some((liberada:string) => liberada === url);
        // if (permitido){
        //     next();
        //     return;
        // }

        // let token = (request.body && request.body.access_token) || (request.query && request.query.access_token) || request.headers['authorization'];
        // if (!token || token === null) {
        //     response.status(400).json({message: "Não foi possivel"})
        //     return;
        // }

        // let decoded:any = null;
        // try {
        //     decoded = jwt.decode(token, config.segredo);
        //     if (!decoded || decoded.exp <= Date.now()) {
        //         response.status(400).json({message: "Acesso Expirado, faça login novamente"})
        //         return;
        //     }
        // }catch(e) {
        //     response.status(400).json({message: "Acesso Expirado, faça login novamente"})
        //     return;
        // }

        // let permissao = config.urlsPerfil.find((permissao:any) => permissao.url === url);
        // if (permissao){
        //     let permitido = permissao.perfil.some((perfil:number) => decoded.perfil === perfil);
        //     if (!permitido) {
        //         response.status(400).json({message: "Não foi permitido"})
        //         return;
        //     }
        // }
        next();
    }

}
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const routing_controllers_1 = require("routing-controllers");
let MyMiddlewareBefore = class MyMiddlewareBefore {
    use(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
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
        });
    }
};
MyMiddlewareBefore = __decorate([
    routing_controllers_1.Middleware({ type: "before" })
], MyMiddlewareBefore);
exports.MyMiddlewareBefore = MyMiddlewareBefore;
//# sourceMappingURL=MyMiddlewareBefore.js.map
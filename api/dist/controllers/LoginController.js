"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
const moment = require("moment");
const jwt = require("jwt-simple");
const config_1 = require("../config");
const Admin_1 = require("../model/Admin");
let LoginController = class LoginController {
    constructor() {
        this.expire = moment().add(30, 'days').valueOf();
    }
    admin(req, res, dados) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let admin = yield Admin_1.AdminSchema.findOne({ email: dados.email }, ['nome', 'foto', 'senha', 'ativo']);
                if (!admin || admin.senha !== dados.senha || admin.ativo !== true) {
                    return false;
                }
                ;
                let result = {
                    nome: admin.nome,
                    perfil: 1
                };
                return this.encodeJWT(admin._id, result);
            }
            catch (e) {
                return false;
            }
        });
    }
    encodeJWT(_id, result) {
        this.token = jwt.encode({
            _id: _id,
            perfil: result.perfil,
            exp: this.expire
        }, config_1.config.segredo);
        return {
            token: this.token,
            dados: result,
        };
    }
};
__decorate([
    routing_controllers_1.Post("/admin"),
    __param(0, routing_controllers_1.Req()), __param(1, routing_controllers_1.Res()), __param(2, routing_controllers_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], LoginController.prototype, "admin", null);
LoginController = __decorate([
    routing_controllers_1.JsonController("/login")
], LoginController);
exports.LoginController = LoginController;
//# sourceMappingURL=LoginController.js.map
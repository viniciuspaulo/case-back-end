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
const Api_1 = require("../util/Api");
const Estabelecimento_1 = require("../model/Estabelecimento");
let YielpController = class YielpController {
    constructor() {
        this.api = new Api_1.Api();
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield this.api.apiGet('businesses/search?limit=15&latitude=-23.6102219&longitude=-46.717997');
            let empresas = result.businesses;
            for (let index = 0; index < empresas.length; index++) {
                let filterEmpresa = yield Estabelecimento_1.EstabelecimentoSchema.findOne({ yielpId: empresas[index].id });
                if (filterEmpresa) {
                    empresas[index].conveniada = filterEmpresa._id;
                }
            }
            return empresas;
        });
    }
    pesquisa(texto) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield this.api.apiGet(`businesses/search?term=${texto}&latitude=-23.6102219&longitude=-46.717997`);
            let empresas = result.businesses;
            for (let index = 0; index < empresas.length; index++) {
                let filterEmpresa = yield Estabelecimento_1.EstabelecimentoSchema.findOne({ yielpId: empresas[index].id });
                if (filterEmpresa) {
                    empresas[index].conveniada = filterEmpresa._id;
                }
            }
            return empresas;
        });
    }
};
__decorate([
    routing_controllers_1.Get("/"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], YielpController.prototype, "getAll", null);
__decorate([
    routing_controllers_1.Get("/:texto"),
    __param(0, routing_controllers_1.Param("texto")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], YielpController.prototype, "pesquisa", null);
YielpController = __decorate([
    routing_controllers_1.JsonController("/yielp")
], YielpController);
exports.YielpController = YielpController;
//# sourceMappingURL=YielpController.js.map
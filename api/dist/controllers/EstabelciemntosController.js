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
const Estabelecimento_1 = require("../model/Estabelecimento");
let EstabelciemntosController = class EstabelciemntosController {
    constructor() { }
    getAll(pagina) {
        return __awaiter(this, void 0, void 0, function* () {
            let limit = 10;
            let total = yield Estabelecimento_1.EstabelecimentoSchema.count({});
            let listagem = yield Estabelecimento_1.EstabelecimentoSchema.find()
                .sort({ dataatualizado: -1 })
                .skip((pagina - 1) * limit)
                .limit(limit);
            return { total: total, pagina: pagina, listagem: listagem };
        });
    }
    getOne(res, _id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield Estabelecimento_1.EstabelecimentoSchema.findById(_id);
            }
            catch (e) {
                return res.status(500).send('Não foi possivel buscar a empresa');
            }
        });
    }
    post(req, res, estabelecimento) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(estabelecimento);
                return yield Estabelecimento_1.EstabelecimentoSchema.create(estabelecimento);
            }
            catch (e) {
                return res.status(500).send('Não foi possivel criar empresa');
            }
        });
    }
    put(req, res, _id, estabelecimento) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield Estabelecimento_1.EstabelecimentoSchema.findByIdAndUpdate(estabelecimento._id, estabelecimento);
            }
            catch (e) {
                return res.status(500).send('Não foi possivel atualizar empresa');
            }
        });
    }
    remove(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Estabelecimento_1.EstabelecimentoSchema.remove({ _id: _id });
        });
    }
};
__decorate([
    routing_controllers_1.Get("/all/:pagina"),
    __param(0, routing_controllers_1.Param("pagina")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], EstabelciemntosController.prototype, "getAll", null);
__decorate([
    routing_controllers_1.Get("/:_id"),
    __param(0, routing_controllers_1.Res()), __param(1, routing_controllers_1.Param("_id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], EstabelciemntosController.prototype, "getOne", null);
__decorate([
    routing_controllers_1.Post("/"),
    __param(0, routing_controllers_1.Req()), __param(1, routing_controllers_1.Res()), __param(2, routing_controllers_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", Promise)
], EstabelciemntosController.prototype, "post", null);
__decorate([
    routing_controllers_1.Put("/:_id"),
    __param(0, routing_controllers_1.Req()), __param(1, routing_controllers_1.Res()), __param(2, routing_controllers_1.Param("_id")), __param(3, routing_controllers_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String, Object]),
    __metadata("design:returntype", Promise)
], EstabelciemntosController.prototype, "put", null);
__decorate([
    routing_controllers_1.Delete("/:_id"),
    __param(0, routing_controllers_1.Param("_id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EstabelciemntosController.prototype, "remove", null);
EstabelciemntosController = __decorate([
    routing_controllers_1.JsonController("/estabelecimentos"),
    __metadata("design:paramtypes", [])
], EstabelciemntosController);
exports.EstabelciemntosController = EstabelciemntosController;
//# sourceMappingURL=EstabelciemntosController.js.map
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
const GenericUtil_1 = require("../util/GenericUtil");
const fs = require("fs");
const path = require("path");
const config_1 = require("../config");
let UploadController = class UploadController {
    getOne(nome) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield new Promise(done => setTimeout(done, 1500));
                let file = fs.readFileSync(path.join(__dirname, config_1.config.producao ? config_1.config.publicUpload : config_1.config.publicUpload, nome));
                return file;
            }
            catch (e) {
                return false;
            }
        });
    }
    post(dados) {
        return __awaiter(this, void 0, void 0, function* () {
            let util = new GenericUtil_1.GenericUtil();
            return util.fileImageBase64(dados.img);
        });
    }
    remove(img) {
        return __awaiter(this, void 0, void 0, function* () {
            let util = new GenericUtil_1.GenericUtil();
            return util.removeImageBase64(img);
        });
    }
};
__decorate([
    routing_controllers_1.Get("/:nome"),
    __param(0, routing_controllers_1.Param("nome")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UploadController.prototype, "getOne", null);
__decorate([
    routing_controllers_1.Post("/"),
    __param(0, routing_controllers_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UploadController.prototype, "post", null);
__decorate([
    routing_controllers_1.Delete("/:img"),
    __param(0, routing_controllers_1.Param("img")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UploadController.prototype, "remove", null);
UploadController = __decorate([
    routing_controllers_1.JsonController("/upload")
], UploadController);
exports.UploadController = UploadController;
//# sourceMappingURL=UploadController.js.map
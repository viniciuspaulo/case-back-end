"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
;
exports.AdminSchema = mongoose.model('Admin', new Schema({
    nome: String,
    email: String,
    senha: String,
    ativo: Boolean,
    datacadastro: { type: Date, default: Date.now() },
    dataatualizado: { type: Date, default: Date.now() },
}));
//# sourceMappingURL=Admin.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
class Coordenadas {
    constructor() {
        this.type = "Point";
        this.coordinates = [];
    }
}
exports.Coordenadas = Coordenadas;
;
exports.EstabelecimentoSchema = mongoose.model('Estabelecimento', new Schema({
    nome: { type: String, required: true },
    logo: String,
    cnpj: String,
    sobre: String,
    nomeContato: String,
    emailContato: String,
    telefoneContato: String,
    //Contato
    email: { type: String, required: true },
    emailOpcional: String,
    telefone: String,
    ceular: String,
    endereco: String,
    cep: String,
    numero: Number,
    bairro: String,
    uf: String,
    cidade: String,
    pais: String,
    coordenadas: { type: { type: String, enum: "Point", default: "Point" }, coordinates: { type: [Number], default: [0, 0] } },
    segunda: Boolean,
    segunda_ini: String,
    segunda_fim: String,
    terca: Boolean,
    terca_ini: String,
    terca_fim: String,
    quarta: Boolean,
    quarta_ini: String,
    quarta_fim: String,
    quinta: Boolean,
    quinta_ini: String,
    quinta_fim: String,
    sexta: Boolean,
    sexta_ini: String,
    sexta_fim: String,
    sabado: Boolean,
    sabado_ini: String,
    sabado_fim: String,
    domingo: Boolean,
    domingo_ini: String,
    domingo_fim: String,
    site: String,
    instagram: String,
    facebook: String,
    whatsapp: String,
    messenger: String,
    youtube: String,
    linkedin: String,
    imagens: [String],
    yielpId: String,
    ativo: Boolean,
    datacadastro: { type: Date, default: Date.now() },
    dataatualizado: { type: Date, default: Date.now() },
}));
//# sourceMappingURL=Estabelecimento.js.map
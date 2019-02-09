"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("./express");
const path = require("path");
const config_1 = require("./config");
const express = new express_1.default();
express.app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, config_1.config.publicUrl + 'index.html'));
});
express.app.listen(config_1.config.porta, () => {
    console.log(`
        Projeto  : ${config_1.config.projeto}
        Api      : api/${config_1.config.versao}
        Versão   : ${config_1.config.versao}
        Porta    : ${config_1.config.porta}
        Ambiente : ${config_1.config.producao ? 'Producao' : 'Desenvolvimento'}
    `);
});
//# sourceMappingURL=server.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const morgan = require("morgan");
const path_1 = require("path");
const config_1 = require("./config");
const routing_controllers_1 = require("routing-controllers");
const MyMiddlewareBefore_1 = require("./util/MyMiddlewareBefore");
class Express {
    constructor() {
        this.conexao = null;
        this.controlers = null;
        this.app = express();
        /**
         * Verificar ambiente
         */
        this.controlers = `${path_1.resolve(config_1.config.urlcontrollersProd[0], config_1.config.urlcontrollersProd[1])}/*{.js,.ts}`;
        if (!config_1.config.producao) {
            this.controlers = `${path_1.resolve(config_1.config.urlcontrollersDev[0], config_1.config.urlcontrollersDev[1])}/*{.js,.ts}`;
        }
        /**
         * Configuração do banco de dados
         */
        this.conexao = mongoose.connect(config_1.config.producao ? config_1.config.bancoProd : config_1.config.bancoDev);
        mongoose.set('useCreateIndex', true);
        mongoose.set('useFindAndModify', false);
        this.conexao.then(() => console.log(`
            Banco Conectado : ${config_1.config.producao ? config_1.config.bancoProd : config_1.config.bancoDev}
            Controllers : ${this.controlers}
            *****************************`)).catch(() => { console.log('Não foi possivel conecatr ao banco'); });
        /**
         * Configuração para express
         */
        this.app.use(cors());
        this.app.use(morgan('tiny'));
        this.app.use(bodyParser.json({ limit: '50mb' }));
        this.app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
        this.app.use(express.static(path.join(__dirname, config_1.config.publicUrl)));
        this.app.use('/uploads', express.static(path.join(__dirname, './uploads')));
        routing_controllers_1.useExpressServer(this.app, {
            routePrefix: `/api/${config_1.config.versao}`,
            defaultErrorHandler: false,
            classTransformer: false,
            // cors: true,    
            controllers: [this.controlers],
            middlewares: [MyMiddlewareBefore_1.MyMiddlewareBefore]
        });
    }
}
exports.default = Express;
//# sourceMappingURL=express.js.map
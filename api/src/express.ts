import "reflect-metadata";
import * as express from 'express';
import * as mongoose from 'mongoose'
import * as bodyParser from 'body-parser';
import * as path from 'path';
import * as cors from 'cors';
import * as morgan from 'morgan';
import { resolve } from 'path';
import { config } from './config';
import { useExpressServer } from "routing-controllers";
import { MyMiddlewareBefore } from "./util/MyMiddlewareBefore";

export default class Express {
    public app: express.Application;
    private conexao:any = null;
    private controlers:any = null;

    constructor() {
        this.app = express();

        /**
         * Verificar ambiente
         */
        this.controlers = `${resolve(config.urlcontrollersProd[0], config.urlcontrollersProd[1])}/*{.js,.ts}`;
        if(!config.producao){
            this.controlers = `${resolve(config.urlcontrollersDev[0], config.urlcontrollersDev[1])}/*{.js,.ts}`;
        }


        /**
         * Configuração do banco de dados
         */
        this.conexao = mongoose.connect(config.producao ? config.bancoProd : config.bancoDev)
        mongoose.set('useCreateIndex', true);
        mongoose.set('useFindAndModify', false);
        this.conexao.then(() => console.log(`
            Banco Conectado : ${config.producao ? config.bancoProd : config.bancoDev}
            Controllers : ${this.controlers}
            *****************************`
        )).catch(()=> {console.log('Não foi possivel conecatr ao banco')});
        

        /**
         * Configuração para express
         */
        this.app.use(cors());
        this.app.use(morgan('tiny'));
        this.app.use(bodyParser.json({limit: '50mb'}));
        this.app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
        this.app.use(express.static(path.join(__dirname, config.publicUrl)));
        this.app.use('/uploads',express.static(path.join(__dirname, './uploads')));
        useExpressServer(this.app, {
            routePrefix: `/api/${config.versao}`,
            defaultErrorHandler: false,
            classTransformer: false,
            // cors: true,    
            controllers: [this.controlers],
            middlewares: [MyMiddlewareBefore]
        });
    }

}
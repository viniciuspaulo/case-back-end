import Express from './express'
import * as path from 'path';
import { config } from './config';

const express:Express = new Express();
express.app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname, config.publicUrl+'index.html'));
});
express.app.listen(config.porta, () =>{
    console.log(`
        Projeto  : ${config.projeto}
        Api      : api/${config.versao}
        Versão   : ${config.versao}
        Porta    : ${config.porta}
        Ambiente : ${config.producao ? 'Producao' : 'Desenvolvimento'}
    `);
}); 
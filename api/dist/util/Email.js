"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer = require("nodemailer");
const config_1 = require("../config");
class Email {
    constructor() {
        this.transporter = nodemailer.createTransport(config_1.config.email);
    }
    send(para, titulo, texto, html) {
        return __awaiter(this, void 0, void 0, function* () {
            let mailOptions = {
                from: config_1.config.email.auth.user,
                to: para,
                subject: titulo,
                text: texto,
                html: html
            };
            yield this.transporter.sendMail(mailOptions, (erro, info) => {
                console.log('Message sent: %s', info.messageId);
                console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
            });
        });
    }
    modelo(cliente) {
        let para = `cadastros@chooz.com.br,vbbritodepaulo@gmail.com`;
        let titulo = `Houston we have a new Choozer 🚀`;
        let subtitle = `chooz`;
        // let html = model_cadastro_email;
        // html = html.replace('MODEL_NOME',cliente.nome);
        // try { 
        //     this.send(para,titulo,subtitle,html)
        //     .then(sucess => true)
        //     .catch(error => console.log(error));   
        // }catch(e) {
        //     console.log('Não foi possivel mandar email')
        // }
    }
}
exports.Email = Email;
//# sourceMappingURL=Email.js.map
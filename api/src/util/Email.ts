
import * as moment from 'moment';
import * as nodemailer from 'nodemailer';
import { config } from '../config';


export class Email{

    private transporter:any;

    constructor() {
        this.transporter = nodemailer.createTransport(config.email);  
    }

    async send(para:string,titulo:string,texto:string,html:string) {
        let mailOptions = {
            from: config.email.auth.user,
            to: para,
            subject: titulo,
            text: texto,
            html: html 
        };
        await this.transporter.sendMail(mailOptions, (erro:any, info:any) => {
            console.log('Message sent: %s', info.messageId);
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        });
    }

    modelo(cliente:any){
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
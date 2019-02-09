const base64Img = require('base64-img');

import * as fs from 'fs';
import * as moment from 'moment';
import * as jwt from 'jwt-simple';
import { config } from '../config';

export class GenericUtil{

  fileImageBase64(img:string){
    let nome:string = this.generateToken(50)+moment().format('_DD_MM_YYYY_HH_mm');
    return base64Img.imgSync(img, 'upload', nome);
  }

  removeImageBase64(img:string){
    fs.unlinkSync(__dirname+`/${config.publicUpload}/${img}`);
  }

  generateToken(n = 50) {
    var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var token = '';
    for(var i = 0; i < n; i++) {
        token += chars[Math.floor(Math.random() * chars.length)];
    }
    return token;
  }
  pegaToken(request:any){
    let token = (request.body && request.body.access_token) || (request.query && request.query.access_token) || request.headers['authorization'];
    return jwt.decode(token, config.segredo);
  }
  token(token:any){
    return jwt.decode(token, config.segredo);
  }
}
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base64Img = require('base64-img');
const fs = require("fs");
const moment = require("moment");
const jwt = require("jwt-simple");
const config_1 = require("../config");
class GenericUtil {
    fileImageBase64(img) {
        let nome = this.generateToken(50) + moment().format('_DD_MM_YYYY_HH_mm');
        return base64Img.imgSync(img, 'upload', nome);
    }
    removeImageBase64(img) {
        fs.unlinkSync(__dirname + `/${config_1.config.publicUpload}/${img}`);
    }
    generateToken(n = 50) {
        var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        var token = '';
        for (var i = 0; i < n; i++) {
            token += chars[Math.floor(Math.random() * chars.length)];
        }
        return token;
    }
    pegaToken(request) {
        let token = (request.body && request.body.access_token) || (request.query && request.query.access_token) || request.headers['authorization'];
        return jwt.decode(token, config_1.config.segredo);
    }
    token(token) {
        return jwt.decode(token, config_1.config.segredo);
    }
}
exports.GenericUtil = GenericUtil;
//# sourceMappingURL=GenericUtil.1.js.map
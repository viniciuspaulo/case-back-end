"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const multer = require("multer");
const path = require("path");
const moment = require("moment");
const GenericUtil_1 = require("./GenericUtil");
const config_1 = require("../config");
exports.storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, config_1.config.producao ? `../` + config_1.config.publicUpload : config_1.config.publicUpload));
    },
    filename: (req, file, cb) => {
        let generic = new GenericUtil_1.GenericUtil();
        let original = file.originalname.split('.')[0];
        let extensao = file.originalname.split('.')[1];
        let code = `_${generic.generateToken(5)}${moment().format('_DD_MM_YYYY_HH_mm')}`;
        let arquivo = `${original}${code}.${extensao}`;
        arquivo = arquivo.replace(/\s/g, '');
        cb(null, arquivo);
    }
});
exports.fileUploadOptions = multer({ storage: exports.storage });
//# sourceMappingURL=FileUpload.js.map
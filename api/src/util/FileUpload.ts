import * as multer from 'multer';
import * as path from 'path';
import * as moment from 'moment';
import { GenericUtil } from './GenericUtil';
import { config } from '../config';

export const storage = multer.diskStorage({
    destination: (req: any, file: any, cb: any) => {
        cb(null, path.join(__dirname, config.producao ? `../`+config.publicUpload : config.publicUpload));
    },
    filename: (req: any, file: any, cb: any) => {
    
        let generic = new GenericUtil();
        let original = file.originalname.split('.')[0];
        let extensao = file.originalname.split('.')[1];
        let code = `_${generic.generateToken(5)}${moment().format('_DD_MM_YYYY_HH_mm')}`

        let arquivo = `${original}${code}.${extensao}`;
        arquivo = arquivo.replace(/\s/g, '');
        cb(null, arquivo);
    }
})

export const fileUploadOptions = multer({ storage });
import {JsonController, Param, Body, Get, Post, Put, Delete, NotFoundError, Req, Res, Header} from "routing-controllers";
import { GenericUtil } from "../util/GenericUtil";
import * as fs from 'fs';
import * as path from 'path';
import { config } from "../config";

@JsonController("/upload")
export class UploadController{
    

    @Get("/:nome")
    async getOne(@Param("nome") nome: string){
        try {
            await new Promise(done => setTimeout(done, 1500));
            let file = fs.readFileSync(path.join(__dirname, config.producao ? config.publicUpload : config.publicUpload, nome));
            return file;
        }catch(e) {
            return false;
        }
    }
    
    @Post("/")
    async post(@Body() dados: any){
        let util = new GenericUtil();
        return util.fileImageBase64(dados.img);
    }

    
    @Delete("/:img")
    async remove(@Param("img") img: string): Promise<any> {
        let util = new GenericUtil();
        return util.removeImageBase64(img);
    }

}
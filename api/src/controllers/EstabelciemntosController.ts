import {JsonController, Param, Body, Get, Post, Put, Delete, NotFoundError, Req, Res} from "routing-controllers";
import { Estabelecimento, EstabelecimentoSchema } from "../model/Estabelecimento";

@JsonController("/estabelecimentos")
export class EstabelciemntosController{
    constructor(){}
    
    @Get("/all/:pagina")
    async getAll(@Param("pagina") pagina:number): Promise<any> {
        let limit = 10;
        let total:number = await EstabelecimentoSchema.count({});
        let listagem:any[] = await EstabelecimentoSchema.find()
            .sort({dataatualizado:-1})
            .skip((pagina - 1) * limit)
            .limit(limit);
            return {total : total, pagina : pagina, listagem : listagem}
    }
    
    @Get("/:_id")
    async getOne(@Res() res: any, @Param("_id") _id: string): Promise<any> {
        try {
            return await EstabelecimentoSchema.findById(_id);
        }catch(e){
            return res.status(500).send('Não foi possivel buscar a empresa');
        }
    }

    @Post("/")
    async post(@Req() req: any, @Res() res: any, @Body() estabelecimento: Estabelecimento): Promise<any> {
        try {
            console.log(estabelecimento)
            return await EstabelecimentoSchema.create(estabelecimento);
        }catch(e){
            return res.status(500).send('Não foi possivel criar empresa');
        }
    }

    @Put("/:_id")
    async put(@Req() req: any, @Res() res: any, @Param("_id") _id: string, @Body() estabelecimento: Estabelecimento): Promise<any> {
        try {
            return  await EstabelecimentoSchema.findByIdAndUpdate(estabelecimento._id, estabelecimento);
        }catch(e){
            return res.status(500).send('Não foi possivel atualizar empresa');
        }
    }

    @Delete("/:_id")
    async remove(@Param("_id") _id: string): Promise<any> {
        return await EstabelecimentoSchema.remove({_id:_id});
    }

}
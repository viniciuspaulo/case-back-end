import { JsonController, Param, Body, Get, Post, Put, Delete, Req, Res } from "routing-controllers";
import { AdminSchema } from "../model/Admin";
import { Admin } from "mongodb";

@JsonController("/admin")
export class AdminController {

    @Get("/all/:pagina")
    async getAll(@Param("pagina") pagina:number): Promise<any> {
        let limit = 10;
        let total:number = await AdminSchema.count({});
        let listagem:any[] = await AdminSchema
            .find()
            .sort({dataatualizado:-1})
            .skip((pagina - 1) * limit)
            .limit(limit);

            return {total : total, pagina : pagina, listagem : listagem}
    }

    @Get("/:_id")
    async getOne(@Param("_id") _id: string): Promise<any> {
        return await AdminSchema.findById(_id)
    }

    @Post("/")
    async post(@Req() req: any, @Res() res: any, @Body() admin: Admin): Promise<any> {
        return await AdminSchema.create(admin)
    }

    @Put("/:_id")
    async put(@Req() req: any, @Param("_id") _id: string, @Body() admin: Admin): Promise<any> {
        return await AdminSchema.findByIdAndUpdate(_id, admin)
    }

    @Delete("/:_id")
    async remove(@Param("_id") _id: string): Promise<any> {
        return await AdminSchema.remove({ _id: _id });
    }

}
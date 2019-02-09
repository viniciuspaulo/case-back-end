import { JsonController, Get, Param} from "routing-controllers";
import { Api } from "../util/Api";
import { EstabelecimentoSchema } from "../model/Estabelecimento";


@JsonController("/yielp")
export class YielpController {
    private api = new Api();
    
    @Get("/")
    async getAll(): Promise<any> {
       let result = await this.api.apiGet('businesses/search?limit=15&latitude=-23.6102219&longitude=-46.717997');
       let empresas = result.businesses;
       for (let index = 0; index < empresas.length; index++) {
            let filterEmpresa = await EstabelecimentoSchema.findOne({yielpId : empresas[index].id});
            if (filterEmpresa) {
                empresas[index].conveniada = filterEmpresa._id;
            }
        }
       return empresas;
    }

    @Get("/:texto")
    async pesquisa(@Param("texto") texto: string): Promise<any> {
        let result = await this.api.apiGet(`businesses/search?term=${texto}&latitude=-23.6102219&longitude=-46.717997`);
        let empresas = result.businesses;
        
        for (let index = 0; index < empresas.length; index++) {
            let filterEmpresa = await EstabelecimentoSchema.findOne({yielpId : empresas[index].id});
            if (filterEmpresa) {
                empresas[index].conveniada = filterEmpresa._id;
            }
        }
    
        return empresas;
    }
}

export const config = {

    /**
     * Configuraçãoes gerais
     */
    projeto : 'Helton',
    versao : '2.0',
    segredo : 'helton@2018',
    porta : 3000,
    
    /**
     * Local de pastas publicas
     */
    publicUrl : './public/',
    publicUpload : '../../upload',

    /**
     * Key api de yielp
     */
    clientIdApiYielp : "TI9PNLERBk90vBmIWphlDA",
    keyApiYielp : "nL3ET4c4CnqkoWGNJdED7U2TDRd8tEchR7S7hypOB4MohECNJHdJKbjt4lb7okvtuwHX1eVe3GO6SLlpeF8L2MZZOBbL_3HVnkTwXmFvj6-_sWS61P9ea8zsAJ1cXHYx",

    /**
     * Banco de dados
     */
    bancoDev : 'mongodb://68.183.250.2:27017/helton',
    bancoProd : 'mongodb://localhost:27017/helton',
    
    /**
     * Build (Desenvolviemnto and Producao)
     */
    producao : __dirname.split('/')[2] === 'viniciusdepaulo' ? false : true,
    urlcontrollersDev : [`dist`,`controllers`],
    urlcontrollersProd : [`./`,`controllers`],
    
    /**
     * Configuração para envio de email
     */
    email : {
        host: 'mx1.hostinger.com.br',
        port : 587,
        secure : false,
        auth: {
            user: 'email',
            pass: 'senha'
        }
    },
    
    /**
     * COnfiguração elasticsearch
     */
    elasticsearch : {
        host : 'http://191.252.184.12:9200',
        index : 'helton',
        log  : 'trace'
    },
    
    /**
     * Configuração para agendamento
     */
    agendadorTime : '0 */30 * * * *',

    /**
     * Configuração de rotas
     */
    urlsPerfil : [{ url : 'empresas' , perfil : [1]}],
    urlsPermitidas : ['loginadmin','login','util','upload'],
}

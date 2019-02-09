import { Message } from "primeng/primeng";
import * as $ from 'jquery';
import io from "socket.io-client";
declare const Notification: any;

export class GenericUtil{
    
    // public urlOrigin = "http://localhost:3000/";
    public urlOrigin  = '/';
    // public urlOrigin  = 'http://vps10828.publiccloud.com.br/';
    
    public url = this.urlOrigin+'api/2.0/';
    public urlImage = this.url;

    //public urlGRAPH  = 'http://192.168.0.101:3000/graphql?query=';
    public urlGRAPH  = '';
    

    public dataAtual = new Date();
    public logado:boolean = false;
    public auth:any = null;
    public ptBr: any;
    public mapsKey = "AIzaSyD7cui_M1g63yhym0pdVF9wqj84-fN1yJs";
    
    public socket;
    public urlSocket = '';


    public loading: boolean = false;
    public loadingTable: boolean = false;
    public ativos:any = [];
    public simnao:any = [];
    public mensagens: Message[] = [];


    //CPF/CNPJ
    cpf_cnpj = '';
    DECIMAL_SEPARATOR=".";
    GROUP_SEPARATOR=",";
    pureResult: any;
    maskedId: any;
    val: any;
    v: any;

    constructor(){

        this.socket = io.connect(this.urlSocket,{transports: ['websocket', 'polling', 'flashsocket']});

        this.ativos = [];
        this.ativos.push({label: 'Todos', value: null});
        this.ativos.push({label: 'Ativado', value: true});
        this.ativos.push({label: 'Desativado', value: false});

        this.simnao = [];
        this.simnao.push({label: 'Todos', value: null});
        this.simnao.push({label: 'Sim', value: true});
        this.simnao.push({label: 'Não', value: false});

        this.verifyLogado();


        this.ptBr = {
            firstDayOfWeek: 0,
            dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
            dayNamesMin: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S', 'D'],
            dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
            monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
            monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
            today: 'Hoje',
            clear: 'Limpar'
        };

    }

    verifyLogado():boolean{
        try{
            this.auth = JSON.parse(localStorage.getItem('_token_tookad'));
            return true;
        }catch(e){
            return false;
        }
    }

    growl(tipo:string,titulo:string,texto:string,time=5000){
        $('.ui-growl').removeClass( "animated fadeOutRight" );
        if(!this.mensagens){ this.mensagens = [] };
        this.mensagens.push({severity:tipo, summary:titulo, detail:texto});
        setTimeout(()=>{
            $('.ui-growl').addClass( "animated fadeOutRight" );
            this.mensagens = [];
        }, time);
    }

     // UTILITARIOS
     convertStringBase64(arquivo:any){    
        return new Promise((resolve, reject) => {
            const file = arquivo.srcElement.files[0];
            const leitura = new FileReader();
            leitura.readAsDataURL(file);
            leitura.onload = () => resolve(leitura.result);
            leitura.onerror = error => reject(error);
        });
    }
  
    validarCPF = (cpf) =>{
        cpf = cpf.replace(/\D/g, '');
        if(cpf.toString().length != 11 || /^(\d)\1{10}$/.test(cpf)) return false;
        var result = true;
        [9,10].forEach(function(j){
            var soma = 0, r;
            cpf.split(/(?=)/).splice(0,j).forEach(function(e, i){
                soma += parseInt(e) * ((j+2)-(i+1));
            });
            r = soma % 11;
            r = (r <2)?0:11-r;
            if(r != cpf.substring(j, j+1)) result = false;
        });
        return result;
    }


    cep(text){
        try{
            return fetch(`https://viacep.com.br/ws/${text}/json/`)
            .then( dados => dados.json())
        }catch(e){}
    }

    googleMapsEndereco(text){
        try{
            return fetch(`https://maps.googleapis.com/maps/api/geocode/json?key=${this.mapsKey}&address=${text}`)
            .then( dados => dados.json())
        }catch(e){}
    }

    clearToken(){
        localStorage.removeItem('_token_tookad');
        localStorage.removeItem('_token_tookad_t');
    }


    format(valString) {
        if (!valString) {
            return '';
        }
        let val = valString.toString();
        const parts = this.unFormat(val).split(this.DECIMAL_SEPARATOR);
        this.pureResult = parts;
        if(parts[0].length <= 11){
          this.maskedId = this.cpf_mask(parts[0]);
          return this.maskedId;
        }else{
          this.maskedId = this.cnpj(parts[0]);
          return this.maskedId;
        }
    };

    unFormat(val) {
        if (!val) {
            return '';
        }
        val = val.replace(/\D/g, '');
    
        if (this.GROUP_SEPARATOR === ',') {
            return val.replace(/,/g, '');
        } else {
            return val.replace(/\./g, '');
        }
    };
    
     cpf_mask(v) {
        v = v.replace(/\D/g, ''); //Remove all that is not digits
        v = v.replace(/(\d{3})(\d)/, '$1.$2'); //Insert a dot between the third and quarter digit
        v = v.replace(/(\d{3})(\d)/, '$1.$2'); //Insert a dot between the third and quarter digit again
        v = v.replace(/(\d{3})(\d{1,2})$/, '$1-$2'); //Insert an dash between the third and quarter digit
        return v;
    }
    
     cnpj(v) {
        v = v.replace(/\D/g, ''); //Remove all that is not digits
        v = v.replace(/^(\d{2})(\d)/, '$1.$2'); //Insert a dot between the second and third digits
        v = v.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3'); //Insert a dot between the fifth and sixth digits
        v = v.replace(/\.(\d{3})(\d)/, '.$1/$2'); //Insert a slash between the eighth and ninth digits
        v = v.replace(/(\d{4})(\d)/, '$1-$2'); //Insert an dash after the quarter digit
        return v;
    }

    notifyMe(title,mensagem,icon=null) {

        let config = {
          body: mensagem,
          icon: icon,
          vibrate: [200, 100, 200]
        }
        if (!("Notification" in window)) {
          alert("This browser does not support desktop notification");
        }
      
        else if (Notification.permission === "granted") {
          var notification = new Notification(title,config);
        }
      
        else if (Notification.permission !== 'denied') {
          Notification.requestPermission(function (permission) {
            if (permission === "granted") {
              var notification = new Notification(title,config);
            }
          });
        }
        try{
          setTimeout(notification.close.bind(notification), 8000);
        }catch(e){}
      }


      csvJSON(csv){
        var lines=csv.split("\n");
        var result = [];
        var headers=lines[0].split(",");
        for(var i=1;i<lines.length;i++){
            var obj = {};
            var currentline=lines[i].split(",");
            for(var j=0;j<headers.length;j++){
                obj[headers[j]] = currentline[j];
            }
            result.push(obj);
        }
        return result //JSON
      }

      calculaProcentagem(v1:number,v2:number) {
        return (((v1 - v2)/v1)*100);
      }
}
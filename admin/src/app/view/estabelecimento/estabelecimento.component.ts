import { Component, OnInit, ViewChild } from '@angular/core';
import { GenericAction } from '../../util/GenericAction';
import { Estabelecimento } from '../../model/Estabelecimento';
import { SelectItem, ConfirmationService } from 'primeng/primeng';
import { RestService } from '../../servicos/rest.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
declare var google: any;
@Component({
  selector: 'app-estabelecimento',
  templateUrl: './estabelecimento.component.html',
  styleUrls: ['./estabelecimento.component.scss']
})
export class EstabelecimentoComponent extends GenericAction<Estabelecimento> implements OnInit{

  public selecionado:Estabelecimento = new Estabelecimento();
  public optionsMap:any;
  public overlays: any[];
  public latitude:any;
  public longitude:any;

  public estados:SelectItem[] = [];
  public cidades:SelectItem[] = [];

  //Crop
  public cropVisivel = false;
  public imageChangedEvent: any = '';
  public croppedImage: any = '';
  

  //Galeria
  @ViewChild('uploadGaleria') uploadGaleria:any;

  @ViewChild('gmap') gmap:any;
  options: any;
  pointMap:any[];



  constructor(public rest: RestService, public confirmationService: ConfirmationService) { 
      super('Estabelecimento','Estabelecimento','estabelecimentos',rest,confirmationService,Estabelecimento);
      
      this.formulario = new FormGroup({
        nome          : new FormControl('',Validators.required),
        sobre         : new FormControl('',),
        email         : new FormControl('',),
        cnpj          : new FormControl('',Validators.required),
        senha         : new FormControl('',),

        endereco : new FormControl(''),
        cep : new FormControl(''),
        numero : new FormControl(''),
        bairro : new FormControl(''),
        uf : new FormControl(''),
        cidade : new FormControl(''),

        tel : new FormControl(''),
        tel2 : new FormControl(''),
        fixo : new FormControl(''),

        segunda : new FormControl(''),
        segunda_ini : new FormControl(''),
        segunda_fim : new FormControl(''),

        terca : new FormControl(''),
        terca_ini : new FormControl(''),
        terca_fim : new FormControl(''),

        quarta : new FormControl(''),
        quarta_ini : new FormControl(''),
        quarta_fim : new FormControl(''),

        quinta : new FormControl(''),
        quinta_ini : new FormControl(''),
        quinta_fim : new FormControl(''),

        sexta : new FormControl(''),
        sexta_ini : new FormControl(''),
        sexta_fim : new FormControl(''),

        sabado : new FormControl(''),
        sabado_ini : new FormControl(''),
        sabado_fim : new FormControl(''),

        domingo : new FormControl(''),
        domingo_ini : new FormControl(''),
        domingo_fim : new FormControl(''),

        instagram : new FormControl(''),
        facebook : new FormControl(''),
        whatsapp : new FormControl(''),
        site : new FormControl(''),
        youtube : new FormControl(''),
        messenger : new FormControl(''),
        linkedin : new FormControl(''),

        ativo : new FormControl(''),
      });
      this.formulario.enable({ emitEvent: false });
  }

  async ngOnInit() {
    navigator.geolocation.getCurrentPosition((position:any) =>{
      this.latitude = position.coords.latitude;
      this.longitude = position.coords.longitude;
    });
    this.buscar();
  }


  buscarYielp(nome:string) {
    this.loading = true;
    this.rest.buscar(`yielp/${this.selecionado.nome}&limit=1`).subscribe((empresas:any) => {
      if (empresas && empresas.length > 0) {
        let empresa = empresas[0];
        this.selecionado.yielpId = empresa.id;
        this.selecionado.nome = empresa.name;
        this.selecionado.nome = empresa.name;
        this.selecionado.cep = empresa.zip_code;
        this.selecionado.endereco = empresa.location.address1;
        this.selecionado.cidade = empresa.location.city;
        this.selecionado.uf = empresa.location.state;
        this.selecionado.coordenadas.coordinates[0] = empresa.coordinates.latitude;
        this.selecionado.coordenadas.coordinates[1] = empresa.coordinates.longitude;
      }
      this.loading = false;
    })
  }

  buscarCep(cep:string){
    if(cep){
      this.cep(cep)
      .then((dados:any) => {
        if(dados){
          this.selecionado.bairro = dados.bairro;
          this.selecionado.cidade = dados.localidade;
          this.selecionado.uf = dados.uf;
          this.selecionado.endereco = dados.logradouro;
          this.buscarLocalizacao()
        }
      })
    }
  }


  //Galeria
  myUploader($event){
    this.loading = true;
    let files = [].slice.call($event.files);
    files.map((img)=>{
      this.readThisGaleria(img);
    })
    this.loading = false;
    this.uploadGaleria.files = null;
  }

  readThisGaleria(inputValue: any): void {
    var file:File = inputValue;
    var myReader2:FileReader = new FileReader();
    
    myReader2.onloadend = (e:any) => {
      this.rest.post('upload',{img : e.srcElement.result})
      .subscribe((img:string) => {
        if (!this.selecionado.imagens) {
          this.selecionado.imagens = [];
        }
        this.selecionado.imagens.push(img);
      })
    }
    myReader2.readAsDataURL(file);
  }


  excluirImagem(foto:number){
    
  }


  atualizarPosicao(){
    navigator.geolocation.getCurrentPosition((position:any) =>{
      this.latitude         = position.coords.latitude;
      this.longitude        = position.coords.longitude;
      this.selecionado.coordenadas.coordinates[0]  = position.coords.latitude;
      this.selecionado.coordenadas.coordinates[1] = position.coords.longitude;
      this.growl('info',this.page_s,`Posição atualizada`);
    });
  }




  //Imagem
  changeListener(event) : void {
    this.cropVisivel = true;
    this.imageChangedEvent = event;
  }

  imageCropped(image: string) {
    this.selecionado.logo = image
  }
  
  salveCrop(){
    this.loading = true;
    this.rest.post('upload',{img : this.selecionado.logo})
    .subscribe((img:string) =>{
      this.loading = false;
      this.cropVisivel = false;
      this.selecionado.logo = img;
    },(error:any) => {
      this.loading = false;
      this.cropVisivel = false;
      this.growl('error',this.page_s, error.error ? error.error : `Não foi possivel cortar`);
    })
  }


  //Maps
  buscarLocalizacao() {
    this.loading = true
    let local = `${this.selecionado.endereco || ''}, ${this.selecionado.cidade || ''}, ${this.selecionado.uf || ''}`
    this.googleMapsEndereco(local)
    .then((dados:any) => {
      this.loading = false;
      if (dados.results && dados.results.length > 0) {
        let location:any = dados.results[0].geometry.location
        this.selecionado.coordenadas.coordinates[0] = location.lat;
        this.selecionado.coordenadas.coordinates[1] = location.lng;
        this.montarMap()
      }
    })
    .catch(erro => {
      this.loading = false;
      console.log(erro)
    })
  }

  clickMapaMinhalocalizacao(evento,map){
    this.pointMap = [];
    this.pointMap.push(new google.maps.Marker(
      {
        position:{lat: evento.latLng.lat(), lng: evento.latLng.lng()}, 
        draggable: true
      }));
    
      this.selecionado.coordenadas.coordinates = []
      this.selecionado.coordenadas.coordinates[0] = evento.latLng.lat();
      this.selecionado.coordenadas.coordinates[1] = evento.latLng.lng();

      map.setCenter(new google.maps.LatLng({lat: evento.latLng.lat(), lng: evento.latLng.lng()}));
      map.setZoom(12);
  }

  montarMap() {
    this.options = {
        center: {lat: this.selecionado.coordenadas.coordinates[0] , lng: this.selecionado.coordenadas.coordinates[1]},
        zoom: 12
    };

    this.pointMap = [];
    this.pointMap.push(new google.maps.Marker(
      {
        position:{lat : this.selecionado.coordenadas.coordinates[0], lng : this.selecionado.coordenadas.coordinates[1]}, 
        draggable: true
      })
    );

    if (this.gmap && this.gmap.map) {
      this.gmap.map.setCenter(new google.maps.LatLng({lat : this.selecionado.coordenadas.coordinates[0], lng : this.selecionado.coordenadas.coordinates[1]}));
      this.gmap.map.setZoom(12);
    }
  }

}

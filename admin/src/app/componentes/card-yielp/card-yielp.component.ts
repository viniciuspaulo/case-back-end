import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card-yielp',
  templateUrl: './card-yielp.component.html',
  styleUrls: ['./card-yielp.component.scss']
})
export class CardYielpComponent implements OnInit {

  @Input("listing") listing:any;

  showMap:boolean = false;
  options: any;
  overlays: any[];
  
  constructor() { }

  ngOnInit() {
    this.options = {
      center: {lat: this.listing.coordinates.latitude, lng: this.listing.coordinates.longitude},
      zoom: 12
    };
  }

}

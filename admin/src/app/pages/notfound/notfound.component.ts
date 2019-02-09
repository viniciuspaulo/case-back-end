import { Component, OnInit } from '@angular/core';
import { GenericUtil } from '../../util/GenericUtil';
import {Router} from '@angular/router';

@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.scss']
})
export class NotfoundComponent extends GenericUtil implements OnInit {

  constructor(public router: Router) { 
    super();
  }

  ngOnInit() {

  }


  login(){
    this.router.navigate(['/login']);
  }

}

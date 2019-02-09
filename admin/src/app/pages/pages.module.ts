import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { GrowlModule, ProgressSpinnerModule, BlockUIModule, RadioButtonModule, GalleriaModule, GMapModule, CardModule, MessageModule, MessagesModule, InputTextModule } from 'primeng/primeng';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NotfoundComponent } from './notfound/notfound.component';
import { HomeComponent } from './home/home.component';
import { CardYielpComponent } from '../componentes/card-yielp/card-yielp.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    
    ProgressSpinnerModule,
    GrowlModule,
    BlockUIModule,
    RadioButtonModule,
    GalleriaModule,
    GMapModule,
    CardModule,
    MessagesModule,
    MessageModule,
    InputTextModule,
    GMapModule
  ],
  declarations: [
    LoginComponent,
    NotfoundComponent,
    HomeComponent,
    CardYielpComponent
  ]
})
export class PagesModule { }

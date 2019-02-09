import {NgModule, LOCALE_ID} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutes} from './app.routes';
import 'rxjs/add/operator/toPromise';

import {AppComponent} from './app.component';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { ComponentesModule } from './componentes/componentes.module';
import { ViewModule } from './view/view.module';

import { registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';
import { ConfigModule } from './config/config.module';
import { ConfirmationService, ProgressBarModule, ScrollPanelModule } from 'primeng/primeng';
import { UtilService } from './servicos/util.service';
import { RestService } from './servicos/rest.service';
// import { MessagingService } from './servicos/messaging.service';

import { PagesModule } from './pages/pages.module';
import { ValidateRequestService } from './servicos/validate-request.service';
registerLocaleData(ptBr)

export const firebaseConfig = {
    "apiKey": "AIzaSyDiA0fzyPX78fQ1n6pqnAvkYTTFHlCpY60",
    "authDomain": "tookad-176b2.firebaseapp.com",
    "databaseURL": "https://tookad-176b2.firebaseio.com",
    "storageBucket": "tookad-176b2.appspot.com",
    "messagingSenderId": "935965500001"
  };

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from '../../node_modules/angularfire2/auth';
import { HookService } from './servicos/hook.service';


@NgModule({
    imports: [
        BrowserModule,
        AppRoutes,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        CurrencyMaskModule,
        ConfigModule,
        AngularFireModule.initializeApp(firebaseConfig),
        AngularFireDatabaseModule,
        AngularFireAuthModule,

        PagesModule,
        ComponentesModule,
        ViewModule,

        ProgressBarModule,
        ScrollPanelModule,
    ],
    declarations: [
        AppComponent
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass : ValidateRequestService,
            multi : true
        },
        {provide: LocationStrategy, useClass: HashLocationStrategy},
        { provide: LOCALE_ID, useValue: 'pt' },
        RestService,
        UtilService,
        HookService,
        // MessagingService,
        ConfirmationService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }

import {Routes, RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';

import { LoginComponent } from './pages/login/login.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { EstabelecimentoComponent } from './view/estabelecimento/estabelecimento.component';
import { HomeComponent } from './pages/home/home.component';
export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'login', component: LoginComponent},
    {path: '404', component: NotfoundComponent},
    {path: '*', redirectTo: '/404'},

    {path: 'estabelecimentos', component: EstabelecimentoComponent}
];

export const AppRoutes: ModuleWithProviders = RouterModule.forRoot(routes);

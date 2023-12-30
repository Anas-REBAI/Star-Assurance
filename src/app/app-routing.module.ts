import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SignupComponent } from './components/signup/signup.component';
import { AddclientComponent } from './components/addclient/addclient.component';
import { AddsinistreComponent } from './components/addsinistre/addsinistre.component';

const routes: Routes = [
  {path:"",component: HomeComponent},
  {path:"signup",component: SignupComponent},
  {path:"createPassword/:activationToken",component: SignupComponent},
  {path:"addClient",component: AddclientComponent},
  {path:"addSinistre",component: AddsinistreComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

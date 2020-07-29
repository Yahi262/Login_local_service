import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatCardModule} from '@angular/material/card';//agrega el cuadro
import {MatTabsModule} from '@angular/material/tabs';//nav de arriba
import {MatInputModule} from '@angular/material/input';//cajas de txt
import {MatButtonModule} from '@angular/material/button';//boton
import {FormsModule, ReactiveFormsModule} from '@angular/forms';//modulo de formularios
import {MatIconModule} from '@angular/material/icon' //iconos
import {MatFormFieldModule} from '@angular/material/form-field';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule, MatTabsModule, MatInputModule,
    MatButtonModule, FormsModule, MatIconModule,
    MatFormFieldModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

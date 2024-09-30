import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './vistas/login/login.component';
import { FondosComponent } from './moduloFondos/fondos/fondos.component';
import { TransaccionesComponent } from './transacciones/transacciones.component';
import { HeaderComponent } from './vistas/header/header.component';
import { PrincipalComponent } from './vistas/principal/principal.component'; 
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SuscripcionFormComponent } from './moduloFondos/suscripcion-form/suscripcion-form.component'; 
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FondosComponent,
    TransaccionesComponent,
    HeaderComponent,
    PrincipalComponent,
    SuscripcionFormComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

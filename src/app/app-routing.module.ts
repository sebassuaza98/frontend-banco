import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './vistas/login/login.component';
import { PrincipalComponent } from './vistas/principal/principal.component';
import { FondosComponent } from './moduloFondos/fondos/fondos.component';
import { TransaccionesComponent } from './transacciones/transacciones.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'principal', component: PrincipalComponent },
  { path: 'fondos', component: FondosComponent },
  { path: 'transacciones', component: TransaccionesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

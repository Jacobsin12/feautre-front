import { Routes } from '@angular/router';
import { DivisionesComponent } from './components/divisiones/divisiones.component';
import { ProgramaeduComponent } from './components/programaedu/programaedu.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'divisiones', component: DivisionesComponent },
  { path: 'programaedu', component: ProgramaeduComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Home como principal
  { path: '**', redirectTo: '/home' }
];

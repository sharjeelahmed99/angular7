import { AuthAdminGuardService } from './services/auth-admin-guard.service';
import { AuthGuardService } from './services/auth-guard.service';
import { AdminComponent } from './components/admin/admin.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroesComponent } from './heroes/heroes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { VehicalFormComponent } from './components/vehical-form/vehical-form.component';
import { VehicalListComponent } from './components/vehical-list/vehical-list.component';

const routes: Routes = [
  { path: 'heroes', component: HeroesComponent },
  { path: 'home', component: DashboardComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'detail/:id', component: HeroDetailComponent },
  { path: 'vehicals/new', component: VehicalFormComponent, canActivate: [AuthGuardService] },
  { path: 'vehicals/:id', component: VehicalFormComponent, canActivate: [AuthGuardService] },
  { path: 'vehicals', component: VehicalListComponent, canActivate: [AuthGuardService] },
  { path: 'admin', component: AdminComponent, canActivate: [AuthAdminGuardService] }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

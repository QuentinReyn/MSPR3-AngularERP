import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AchatsComponent } from './components/achats/achats.component';
import { PrixComponent } from './components/achats/prix/prix.component';
import { MarchesComponent } from './components/achats/marches/marches.component';
import { CommandesComponent } from './components/achats/commandes/commandes.component';
import { FinanceComponent } from './components/finance/finance.component';
import { RessourceHumainesComponent } from './components/ressource-humaines/ressource-humaines.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'achats', component: AchatsComponent,
  children: [
    {
      path: 'prix', // child route path
      component: PrixComponent, // child route component that the router renders
    },
    {
      path: 'marches',
      component: MarchesComponent, // another child route component that the router renders
    },
    {
      path: 'commandes',
      component: CommandesComponent, // another child route component that the router renders
    },
  ],
 },
 { path: 'finances', component: FinanceComponent},
 { path: 'RH', component: RessourceHumainesComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

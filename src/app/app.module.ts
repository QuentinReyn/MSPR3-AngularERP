import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//Angular Material Components
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatBadgeModule } from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTreeModule } from '@angular/material/tree';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { PrixComponent } from './components/achats/prix/prix.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AchatsComponent } from './components/achats/achats.component';
import { MarchesComponent } from './components/achats/marches/marches.component';
import { CommandesComponent } from './components/achats/commandes/commandes.component';
import { PrixAddComponent } from './components/achats/prix/prix-add/prix-add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { MarchesAddComponent } from './components/achats/marches/marches-add/marches-add.component';
import { CommandesAddComponent } from './components/achats/commandes/commandes-add/commandes-add.component';
import { FinanceComponent } from './components/finance/finance.component';
import { ConditionsVenteComponent } from './components/finance/conditions-vente/conditions-vente.component';
import { RhFinanceComponent } from './components/finance/rh-finance/rh-finance.component';
import { ClientsAddComponent } from './components/finance/clients/clients-add/clients-add.component';
import { ConditionsVenteAddComponent } from './components/finance/conditions-vente/conditions-vente-add/conditions-vente-add.component';
import { RhFinanceAddComponent } from './components/finance/rh-finance/rh-finance-add/rh-finance-add.component';
import { RessourceHumainesComponent } from './components/ressource-humaines/ressource-humaines.component';
import { GestionCoutsComponent } from './components/ressource-humaines/gestion-couts/gestion-couts.component';
import { GestionComptesComponent } from './components/ressource-humaines/gestion-comptes/gestion-comptes.component';
import { TvaComponent } from './components/ressource-humaines/tva/tva.component';
import { TvaAddComponent } from './components/ressource-humaines/tva/tva-add/tva-add.component';
import { GestionComptesAddComponent } from './components/ressource-humaines/gestion-comptes/gestion-comptes-add/gestion-comptes-add.component';
import { GestionCoutsAddComponent } from './components/ressource-humaines/gestion-couts/gestion-couts-add/gestion-couts-add.component';
import { ClientsComponent } from './components/finance/clients/clients.component';
import { LbdModule } from './components/lbd/lbd.module';

@NgModule({
  declarations: [
    AppComponent,
    PrixComponent,
    DashboardComponent,
    SidenavComponent,
    AchatsComponent,
    MarchesComponent,
    CommandesComponent,
    PrixAddComponent,
    MarchesAddComponent,
    CommandesAddComponent,
    FinanceComponent,
    ConditionsVenteComponent,
    RhFinanceComponent,
    ClientsAddComponent,
    ConditionsVenteAddComponent,
    RhFinanceAddComponent,
    RessourceHumainesComponent,
    GestionCoutsComponent,
    GestionComptesComponent,
    TvaComponent,
    TvaAddComponent,
    GestionComptesAddComponent,
    GestionCoutsAddComponent,
    ClientsComponent,
  ],
 
  imports: [
    CommonModule,
    FormsModule, 
    LbdModule,
    ReactiveFormsModule,
    MatBadgeModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    MatCheckboxModule,
    MatButtonModule,
    MatInputModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatStepperModule,
    MatTabsModule,
    MatExpansionModule,
    MatButtonToggleModule,
    MatChipsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatDialogModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatTableModule,
    MatSortModule,
    HttpClientModule,
    MatPaginatorModule,
    MatTreeModule,
    // AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  entryComponents: [
    PrixAddComponent,
    MarchesAddComponent,
    CommandesAddComponent,
    GestionComptesAddComponent,
    GestionCoutsAddComponent,
    TvaAddComponent,
    RhFinanceAddComponent,
    ConditionsVenteAddComponent,
    ClientsAddComponent],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }

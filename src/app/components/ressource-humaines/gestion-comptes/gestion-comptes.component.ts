import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { GestionComptesService } from '../../../../app/services/gestion-comptes.service';
import { GestionComptesAddComponent } from './gestion-comptes-add/gestion-comptes-add.component';

@Component({
  selector: 'app-gestion-comptes',
  templateUrl: './gestion-comptes.component.html',
  styleUrls: ['./gestion-comptes.component.css']
})
export class GestionComptesComponent implements OnInit ,AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(private GestionCompteService: GestionComptesService, public snackBar: MatSnackBar, public dialog: MatDialog,private ref: ChangeDetectorRef) { }

    isLoadingResults = false;
    totalGestionCompte = 0;
    isMeOnly = false;
    displayedColumns = ["id", "product_name", "tva","price", "actions"];
    gestionCompte = new MatTableDataSource();


    
    refresh() {
      this.GestionCompteService.listGestionComptes().subscribe(data=> {
        this.gestionCompte.data = data;
        this.ref.detectChanges();
      });
    }

    ngOnInit() {
        this.refresh();
        
    }

    ngAfterViewInit(): void {
      this.gestionCompte.paginator = this.paginator; // For pagination
      this.gestionCompte.sort = this.sort; // For sort
    }

    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.gestionCompte.filter = filterValue.trim().toLowerCase();
  
      if (this.gestionCompte.paginator) {
        this.gestionCompte.paginator.firstPage();
      }
    }

    editGestionCompteModal(GestionCompte) {
        let dialogRef = this.dialog.open(GestionComptesAddComponent, {
            data: GestionCompte,
        });
        dialogRef.afterClosed().subscribe(() => {
            this.refresh();
        })
    }

    openGestionCompteModalAdd() {
        let dialogRef = this.dialog.open(GestionComptesAddComponent);
        dialogRef.afterClosed().subscribe(() => {
            this.refresh();
        })
    }

    deleteGestionCompteById(GestionCompte_id) {
        var ans = confirm("Do you want to delete this GestionCompte ?");
        if (ans) {
            this.GestionCompteService.deleteGestionComptesById(GestionCompte_id).subscribe(success => {
                this.refresh();
                this.snackBar.open("✅ GestionCompte successfully deleted ✅", '', {
                    duration: 1000,
                });
            })
        }

    }
}

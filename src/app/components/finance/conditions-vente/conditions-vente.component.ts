import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ConditionsVenteService } from '../../../../app/services/conditions-vente.service';
import { ConditionsVenteAddComponent } from './conditions-vente-add/conditions-vente-add.component';


@Component({
  selector: 'app-conditions-vente',
  templateUrl: './conditions-vente.component.html',
  styleUrls: ['./conditions-vente.component.css']
})
export class ConditionsVenteComponent implements OnInit ,AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(private conditionsVenteService: ConditionsVenteService, public snackBar: MatSnackBar, public dialog: MatDialog,private ref: ChangeDetectorRef) { }

    isLoadingResults = false;
    totalConditionsVente = 0;
    isMeOnly = false;
    displayedColumns = ["id", "product_name", "tva","price", "actions"];
    conditionsVente = new MatTableDataSource();


    
    refresh() {
      this.conditionsVenteService.listConditionsVente().subscribe(data=> {
        this.conditionsVente.data = data;
        this.ref.detectChanges();
      });
    }

    ngOnInit() {
        this.refresh();
        
    }

    ngAfterViewInit(): void {
      this.conditionsVente.paginator = this.paginator; // For pagination
      this.conditionsVente.sort = this.sort; // For sort
    }

    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.conditionsVente.filter = filterValue.trim().toLowerCase();
  
      if (this.conditionsVente.paginator) {
        this.conditionsVente.paginator.firstPage();
      }
    }

    editConditionsVenteModal(conditionsVente) {
        let dialogRef = this.dialog.open(ConditionsVenteAddComponent, {
            data: conditionsVente,
        });
        dialogRef.afterClosed().subscribe(() => {
            this.refresh();
        })
    }

    openConditionsVenteModalAdd() {
        let dialogRef = this.dialog.open(ConditionsVenteAddComponent);
        dialogRef.afterClosed().subscribe(() => {
            this.refresh();
        })
    }

    deleteConditionsVenteById(conditionsVente_id) {
        var ans = confirm("Do you want to delete this conditions vente ?");
        if (ans) {
            this.conditionsVenteService.deleteConditionsVenteById(conditionsVente_id).subscribe(success => {
                this.refresh();
                this.snackBar.open("✅ Conditions vente successfully deleted ✅", '', {
                    duration: 1000,
                });
            })
        }

    }
}

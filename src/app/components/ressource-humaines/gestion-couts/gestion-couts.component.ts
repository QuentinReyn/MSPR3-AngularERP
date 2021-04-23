import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { GestionCoutsService } from '../../../../app/services/gestion-couts.service';
import { GestionCoutsAddComponent } from './gestion-couts-add/gestion-couts-add.component';

@Component({
  selector: 'app-gestion-couts',
  templateUrl: './gestion-couts.component.html',
  styleUrls: ['./gestion-couts.component.css']
})
export class GestionCoutsComponent implements OnInit ,AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(private gestionCoutService: GestionCoutsService, public snackBar: MatSnackBar, public dialog: MatDialog,private ref: ChangeDetectorRef) { }

    isLoadingResults = false;
    totalGestionCout = 0;
    isMeOnly = false;
    displayedColumns = ["id", "product_name", "tva","price", "actions"];
    gestionCout = new MatTableDataSource();


    
    refresh() {
      this.gestionCoutService.listGestionCout().subscribe(data=> {
        this.gestionCout.data = data;
        this.ref.detectChanges();
      });
    }

    ngOnInit() {
        this.refresh();
        
    }

    ngAfterViewInit(): void {
      this.gestionCout.paginator = this.paginator; // For pagination
      this.gestionCout.sort = this.sort; // For sort
    }

    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.gestionCout.filter = filterValue.trim().toLowerCase();
  
      if (this.gestionCout.paginator) {
        this.gestionCout.paginator.firstPage();
      }
    }

    editGestionCoutModal(gestionCout) {
        let dialogRef = this.dialog.open(GestionCoutsAddComponent, {
            data: gestionCout,
        });
        dialogRef.afterClosed().subscribe(() => {
            this.refresh();
        })
    }

    openGestionCoutModalAdd() {
        let dialogRef = this.dialog.open(GestionCoutsAddComponent);
        dialogRef.afterClosed().subscribe(() => {
            this.refresh();
        })
    }

    deleteGestionCoutById(gestionCout_id) {
        var ans = confirm("Do you want to delete this gestionCout ?");
        if (ans) {
            this.gestionCoutService.deleteGestionCoutById(gestionCout_id).subscribe(success => {
                this.refresh();
                this.snackBar.open("✅ GestionCout successfully deleted ✅", '', {
                    duration: 1000,
                });
            })
        }

    }
}

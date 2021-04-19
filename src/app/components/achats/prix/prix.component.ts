import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PrixService } from '../../../../app/services/prix.service';
import { PrixAddComponent } from './prix-add/prix-add.component';


@Component({
  selector: 'app-prix',
  templateUrl: './prix.component.html',
  styleUrls: ['./prix.component.css']
})
export class PrixComponent implements OnInit,AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(private prixService: PrixService, public snackBar: MatSnackBar, public dialog: MatDialog,private ref: ChangeDetectorRef) { }

    isLoadingResults = false;
    totalPrix = 0;
    isMeOnly = false;
    displayedColumns = ["id", "product_name", "tva","price", "actions"];
    prix = new MatTableDataSource();


    
    refresh() {
      this.prixService.listPrix().subscribe(data=> {
        this.prix.data = data;
        this.ref.detectChanges();
      });
    }

    ngOnInit() {
        this.refresh();
        
    }

    ngAfterViewInit(): void {
      this.prix.paginator = this.paginator; // For pagination
      this.prix.sort = this.sort; // For sort
    }

    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.prix.filter = filterValue.trim().toLowerCase();
  
      if (this.prix.paginator) {
        this.prix.paginator.firstPage();
      }
    }

    editPrixModal(prix) {
        let dialogRef = this.dialog.open(PrixAddComponent, {
            data: prix,
        });
        dialogRef.afterClosed().subscribe(() => {
            this.refresh();
        })
    }

    openPrixModalAdd() {
        let dialogRef = this.dialog.open(PrixAddComponent);
        dialogRef.afterClosed().subscribe(() => {
            this.refresh();
        })
    }

    deletePrixById(prix_id) {
        var ans = confirm("Do you want to delete this prix ?");
        if (ans) {
            this.prixService.deletePrixById(prix_id).subscribe(success => {
                this.refresh();
                this.snackBar.open("✅ Prix successfully deleted ✅", '', {
                    duration: 1000,
                });
            })
        }

    }
}

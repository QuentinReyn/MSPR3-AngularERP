import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TvaService } from '../../../../app/services/tva.service';
import { TvaAddComponent } from './tva-add/tva-add.component';

@Component({
  selector: 'app-tva',
  templateUrl: './tva.component.html',
  styleUrls: ['./tva.component.css']
})
export class TvaComponent implements OnInit,AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(private tvaService: TvaService, public snackBar: MatSnackBar, public dialog: MatDialog,private ref: ChangeDetectorRef) { }

    isLoadingResults = false;
    totalTva = 0;
    isMeOnly = false;
    displayedColumns = ["id", "product_name", "tva","price", "actions"];
    tva = new MatTableDataSource();


    
    refresh() {
      this.tvaService.listTva().subscribe(data=> {
        this.tva.data = data;
        this.ref.detectChanges();
      });
    }

    ngOnInit() {
        this.refresh();
        
    }

    ngAfterViewInit(): void {
      this.tva.paginator = this.paginator; // For pagination
      this.tva.sort = this.sort; // For sort
    }

    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.tva.filter = filterValue.trim().toLowerCase();
  
      if (this.tva.paginator) {
        this.tva.paginator.firstPage();
      }
    }

    editTvaModal(tva) {
        let dialogRef = this.dialog.open(TvaAddComponent, {
            data: tva,
        });
        dialogRef.afterClosed().subscribe(() => {
            this.refresh();
        })
    }

    openTvaModalAdd() {
        let dialogRef = this.dialog.open(TvaAddComponent);
        dialogRef.afterClosed().subscribe(() => {
            this.refresh();
        })
    }

    deleteTvaById(tva_id) {
        var ans = confirm("Do you want to delete this tva ?");
        if (ans) {
            this.tvaService.deleteTvaById(tva_id).subscribe(success => {
                this.refresh();
                this.snackBar.open("✅ Tva successfully deleted ✅", '', {
                    duration: 1000,
                });
            })
        }

    }
}

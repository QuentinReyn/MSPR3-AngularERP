import { Component, OnInit, Inject, EventEmitter, AfterViewInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Global } from '../../../../app/models/global.model';
import { MarchesService } from '../../../../app/services/marches.service';
import { AppSettings } from '../../../../app/app.settings';
import { MarchesAddComponent } from '../marches/marches-add/marches-add.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-marches',
  templateUrl: './marches.component.html',
  styleUrls: ['./marches.component.css']
})
export class MarchesComponent implements OnInit,AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(private marcheService: MarchesService, public snackBar: MatSnackBar, public dialog: MatDialog,private ref: ChangeDetectorRef) { }

    isLoadingResults = false;
    totalMarche = 0;
    isMeOnly = false;
    displayedColumns = ["id", "product_name", "tva","price", "actions"];
    marche = new MatTableDataSource();


    
    refresh() {
      this.marcheService.listMarche().subscribe(data=> {
        this.marche.data = data;
        this.ref.detectChanges();
      });
    }

    ngOnInit() {
        this.refresh();
        
    }

    ngAfterViewInit(): void {
      this.marche.paginator = this.paginator; // For pagination
      this.marche.sort = this.sort; // For sort
    }

    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.marche.filter = filterValue.trim().toLowerCase();
  
      if (this.marche.paginator) {
        this.marche.paginator.firstPage();
      }
    }

    editMarcheModal(marche) {
        let dialogRef = this.dialog.open(MarchesAddComponent, {
            data: marche,
        });
        dialogRef.afterClosed().subscribe(() => {
            this.refresh();
        })
    }

    openMarcheModalAdd() {
        let dialogRef = this.dialog.open(MarchesAddComponent);
        dialogRef.afterClosed().subscribe(() => {
            this.refresh();
        })
    }

    deleteMarcheById(marche_id) {
        var ans = confirm("Do you want to delete this marche ?");
        if (ans) {
            this.marcheService.deleteMarcheById(marche_id).subscribe(success => {
                this.refresh();
                this.snackBar.open("✅ Marche successfully deleted ✅", '', {
                    duration: 1000,
                });
            })
        }

    }
}

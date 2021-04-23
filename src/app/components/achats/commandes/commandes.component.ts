import { Component, OnInit, Inject, EventEmitter, AfterViewInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Global } from '../../../../app/models/global.model';
import { CommandesService } from '../../../../app/services/commandes.service';
import { AppSettings } from '../../../../app/app.settings';
import { CommandesAddComponent } from '../commandes/commandes-add/commandes-add.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-commandes',
  templateUrl: './commandes.component.html',
  styleUrls: ['./commandes.component.css']
})
export class CommandesComponent implements OnInit,AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(private commandeService: CommandesService, public snackBar: MatSnackBar, public dialog: MatDialog,private ref: ChangeDetectorRef) { }

    isLoadingResults = false;
    totalCommande = 0;
    isMeOnly = false;
    displayedColumns = ["id", "product_name", "tva","price", "actions"];
    commande = new MatTableDataSource();


    
    refresh() {
      this.commandeService.listCommande().subscribe(data=> {
        this.commande.data = data;
        this.ref.detectChanges();
      });
    }

    ngOnInit() {
        this.refresh();
        
    }

    ngAfterViewInit(): void {
      this.commande.paginator = this.paginator; // For pagination
      this.commande.sort = this.sort; // For sort
    }

    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.commande.filter = filterValue.trim().toLowerCase();
  
      if (this.commande.paginator) {
        this.commande.paginator.firstPage();
      }
    }

    editCommandeModal(commande) {
        let dialogRef = this.dialog.open(CommandesAddComponent, {
            data: commande,
        });
        dialogRef.afterClosed().subscribe(() => {
            this.refresh();
        })
    }

    openCommandeModalAdd() {
        let dialogRef = this.dialog.open(CommandesAddComponent);
        dialogRef.afterClosed().subscribe(() => {
            this.refresh();
        })
    }

    deleteCommandeById(commande_id) {
        var ans = confirm("Do you want to delete this commande ?");
        if (ans) {
            this.commandeService.deleteCommandeById(commande_id).subscribe(success => {
                this.refresh();
                this.snackBar.open("✅ Commande successfully deleted ✅", '', {
                    duration: 1000,
                });
            })
        }

    }
}

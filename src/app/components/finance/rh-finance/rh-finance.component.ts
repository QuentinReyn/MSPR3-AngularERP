import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RhFinanceService } from '../../../../app/services/rh-finance.service';
import { RhFinanceAddComponent } from './rh-finance-add/rh-finance-add.component';


@Component({
  selector: 'app-rh-finance',
  templateUrl: './rh-finance.component.html',
  styleUrls: ['./rh-finance.component.css']
})
export class RhFinanceComponent implements OnInit,AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(private rhFinanceService: RhFinanceService, public snackBar: MatSnackBar, public dialog: MatDialog,private ref: ChangeDetectorRef) { }

    isLoadingResults = false;
    totalRhFinance = 0;
    isMeOnly = false;
    displayedColumns = ["id", "product_name", "tva","price", "actions"];
    rhFinance = new MatTableDataSource();
    
    refresh() {
      this.rhFinanceService.listRhFinance().subscribe(data=> {
        this.rhFinance.data = data;
        this.ref.detectChanges();
      });
    }

    ngOnInit() {
        this.refresh();
        
    }

    ngAfterViewInit(): void {
      this.rhFinance.paginator = this.paginator; // For pagination
      this.rhFinance.sort = this.sort; // For sort
    }

    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.rhFinance.filter = filterValue.trim().toLowerCase();
  
      if (this.rhFinance.paginator) {
        this.rhFinance.paginator.firstPage();
      }
    }

    editRhFinanceModal(rhFinance) {
        let dialogRef = this.dialog.open(RhFinanceAddComponent, {
            data: rhFinance,
        });
        dialogRef.afterClosed().subscribe(() => {
            this.refresh();
        })
    }

    openRhFinanceModalAdd() {
        let dialogRef = this.dialog.open(RhFinanceAddComponent);
        dialogRef.afterClosed().subscribe(() => {
            this.refresh();
        })
    }

    deleteRhFinanceById(rhFinance_id) {
        var ans = confirm("Do you want to delete this rh/finance ?");
        if (ans) {
            this.rhFinanceService.deleteRhFinanceById(rhFinance_id).subscribe(success => {
                this.refresh();
                this.snackBar.open("✅ Rh finance successfully deleted ✅", '', {
                    duration: 1000,
                });
            })
        }

    }
}

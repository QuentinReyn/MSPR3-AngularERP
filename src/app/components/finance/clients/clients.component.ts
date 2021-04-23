import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ClientsService } from '../../../../app/services/clients.service';
import { ClientsAddComponent } from './clients-add/clients-add.component';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit,AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(private clientService: ClientsService, public snackBar: MatSnackBar, public dialog: MatDialog,private ref: ChangeDetectorRef) { }

    isLoadingResults = false;
    totalClient = 0;
    isMeOnly = false;
    displayedColumns = ["id", "product_name", "tva","price", "actions"];
    client = new MatTableDataSource();


    
    refresh() {
      this.clientService.listClient().subscribe(data=> {
        this.client.data = data;
        this.ref.detectChanges();
      });
    }

    ngOnInit() {
        this.refresh();
        
    }

    ngAfterViewInit(): void {
      this.client.paginator = this.paginator; // For pagination
      this.client.sort = this.sort; // For sort
    }

    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.client.filter = filterValue.trim().toLowerCase();
  
      if (this.client.paginator) {
        this.client.paginator.firstPage();
      }
    }

    editClientModal(client) {
        let dialogRef = this.dialog.open(ClientsAddComponent, {
            data: client,
        });
        dialogRef.afterClosed().subscribe(() => {
            this.refresh();
        })
    }

    openClientModalAdd() {
        let dialogRef = this.dialog.open(ClientsAddComponent);
        dialogRef.afterClosed().subscribe(() => {
            this.refresh();
        })
    }

    deleteClientById(client_id) {
        var ans = confirm("Do you want to delete this client ?");
        if (ans) {
            this.clientService.deleteClientById(client_id).subscribe(success => {
                this.refresh();
                this.snackBar.open("✅ Client successfully deleted ✅", '', {
                    duration: 1000,
                });
            })
        }

    }
}

import { Component, OnInit, Inject, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Global } from '../../../../../app/models/global.model';
import { ClientsService } from '../../../../../app/services/clients.service';
import { AppSettings } from '../../../../../app/app.settings';

@Component({
  selector: 'app-clients-add',
  templateUrl: './clients-add.component.html',
  styleUrls: ['./clients-add.component.css']
})
export class ClientsAddComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public client: Global,
    public snackBar: MatSnackBar,
    private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ClientsAddComponent>,
    public clientService: ClientsService
  ) {}

  onAdd = new EventEmitter();
  clientAddForm: FormGroup;
  appSettings = AppSettings;

  ngOnInit() {
    if (this.client != null) {
      this.clientAddForm = this._formBuilder.group({
        product_name: [this.client.product_name, Validators.required],
        tva: [this.client.tva],
        price: [this.client.price],
        id: [this.client.id],
      });
    } else {
      this.clientAddForm = this._formBuilder.group({
        product_name: ['', Validators.required],
        tva: [],
        price: [],
        id: [0],
      });
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  submitClient() {
    if (this.client == null) {
      this.clientService.listClient().subscribe((data) => {
        var lastId = Math.max.apply(
          Math,
          data.map(function (o) {
            return o.id;
          })
        );
        this.clientAddForm.patchValue({
          id: lastId + 1,
        });
        this.clientService.saveClient(this.clientAddForm);
        this.snackBar.open('✅ client successfully created ✅', null, {
          duration: AppSettings.TOAST_DURATION,
        });
        this.dialogRef.close();
        this.onAdd.emit();
      });
    } else {
      this.clientService.updateClient(this.clientAddForm);
      this.snackBar.open('✅ client successfully edited ✅', null, {
        duration: AppSettings.TOAST_DURATION,
      });
      this.dialogRef.close();
      this.onAdd.emit();
    }
  }
}
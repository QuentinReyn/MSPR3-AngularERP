import { Component, OnInit, Inject, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Global } from '../../../../../app/models/global.model';
import { ConditionsVenteService } from '../../../../../app/services/conditions-vente.service';
import { AppSettings } from '../../../../../app/app.settings';

@Component({
  selector: 'app-conditions-vente-add',
  templateUrl: './conditions-vente-add.component.html',
  styleUrls: ['./conditions-vente-add.component.css']
})
export class ConditionsVenteAddComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public conditionsVente: Global,
    public snackBar: MatSnackBar,
    private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<ConditionsVenteAddComponent>,
    public conditionsVenteService: ConditionsVenteService
  ) {}

  onAdd = new EventEmitter();
  conditionsVenteAddForm: FormGroup;
  appSettings = AppSettings;

  ngOnInit() {
    if (this.conditionsVente != null) {
      this.conditionsVenteAddForm = this._formBuilder.group({
        product_name: [this.conditionsVente.product_name, Validators.required],
        tva: [this.conditionsVente.tva],
        price: [this.conditionsVente.price],
        id: [this.conditionsVente.id],
      });
    } else {
      this.conditionsVenteAddForm = this._formBuilder.group({
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

  submitConditionsVente() {
    if (this.conditionsVente == null) {
      this.conditionsVenteService.listConditionsVente().subscribe((data) => {
        var lastId = Math.max.apply(
          Math,
          data.map(function (o) {
            return o.id;
          })
        );
        this.conditionsVenteAddForm.patchValue({
          id: lastId + 1,
        });
        this.conditionsVenteService.saveConditionsVente(this.conditionsVenteAddForm);
        this.snackBar.open('✅ conditionsVente successfully created ✅', null, {
          duration: AppSettings.TOAST_DURATION,
        });
        this.dialogRef.close();
        this.onAdd.emit();
      });
    } else {
      this.conditionsVenteService.updateConditionsVente(this.conditionsVenteAddForm);
      this.snackBar.open('✅ conditionsVente successfully edited ✅', null, {
        duration: AppSettings.TOAST_DURATION,
      });
      this.dialogRef.close();
      this.onAdd.emit();
    }
  }
}
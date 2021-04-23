import { Component, OnInit, Inject, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Global } from '../../../../../app/models/global.model';
import { GestionComptesService } from '../../../../../app/services/gestion-comptes.service';
import { AppSettings } from '../../../../../app/app.settings';

@Component({
  selector: 'app-gestion-comptes-add',
  templateUrl: './gestion-comptes-add.component.html',
  styleUrls: ['./gestion-comptes-add.component.css']
})
export class GestionComptesAddComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public gestionCompte: Global,
    public snackBar: MatSnackBar,
    private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<GestionComptesAddComponent>,
    public gestionCompteService: GestionComptesService
  ) {}

  onAdd = new EventEmitter();
  gestionCompteAddForm: FormGroup;
  appSettings = AppSettings;

  ngOnInit() {
    if (this.gestionCompte != null) {
      this.gestionCompteAddForm = this._formBuilder.group({
        product_name: [this.gestionCompte.product_name, Validators.required],
        tva: [this.gestionCompte.tva],
        price: [this.gestionCompte.price],
        id: [this.gestionCompte.id],
      });
    } else {
      this.gestionCompteAddForm = this._formBuilder.group({
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

  submitGestionCompte() {
    if (this.gestionCompte == null) {
      this.gestionCompteService.listGestionComptes().subscribe((data) => {
        var lastId = Math.max.apply(
          Math,
          data.map(function (o) {
            return o.id;
          })
        );
        this.gestionCompteAddForm.patchValue({
          id: lastId + 1,
        });
        this.gestionCompteService.saveGestionComptes(this.gestionCompteAddForm);
        this.snackBar.open('✅ gestionCompte successfully created ✅', null, {
          duration: AppSettings.TOAST_DURATION,
        });
        this.dialogRef.close();
        this.onAdd.emit();
      });
    } else {
      this.gestionCompteService.updateGestionComptes(this.gestionCompteAddForm);
      this.snackBar.open('✅ gestionCompte successfully edited ✅', null, {
        duration: AppSettings.TOAST_DURATION,
      });
      this.dialogRef.close();
      this.onAdd.emit();
    }
  }
}
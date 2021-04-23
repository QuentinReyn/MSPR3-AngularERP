import { Component, OnInit, Inject, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Global } from '../../../../../app/models/global.model';
import { GestionCoutsService } from '../../../../../app/services/gestion-couts.service';
import { AppSettings } from '../../../../../app/app.settings';

@Component({
  selector: 'app-gestion-couts-add',
  templateUrl: './gestion-couts-add.component.html',
  styleUrls: ['./gestion-couts-add.component.css']
})
export class GestionCoutsAddComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public gestionCout: Global,
    public snackBar: MatSnackBar,
    private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<GestionCoutsAddComponent>,
    public gestionCoutService: GestionCoutsService
  ) {}

  onAdd = new EventEmitter();
  gestionCoutAddForm: FormGroup;
  appSettings = AppSettings;

  ngOnInit() {
    if (this.gestionCout != null) {
      this.gestionCoutAddForm = this._formBuilder.group({
        product_name: [this.gestionCout.product_name, Validators.required],
        tva: [this.gestionCout.tva],
        price: [this.gestionCout.price],
        id: [this.gestionCout.id],
      });
    } else {
      this.gestionCoutAddForm = this._formBuilder.group({
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

  submitGestionCout() {
    if (this.gestionCout == null) {
      this.gestionCoutService.listGestionCout().subscribe((data) => {
        var lastId = Math.max.apply(
          Math,
          data.map(function (o) {
            return o.id;
          })
        );
        this.gestionCoutAddForm.patchValue({
          id: lastId + 1,
        });
        this.gestionCoutService.saveGestionCout(this.gestionCoutAddForm);
        this.snackBar.open('✅ gestionCout successfully created ✅', null, {
          duration: AppSettings.TOAST_DURATION,
        });
        this.dialogRef.close();
        this.onAdd.emit();
      });
    } else {
      this.gestionCoutService.updateGestionCout(this.gestionCoutAddForm);
      this.snackBar.open('✅ gestionCout successfully edited ✅', null, {
        duration: AppSettings.TOAST_DURATION,
      });
      this.dialogRef.close();
      this.onAdd.emit();
    }
  }
}
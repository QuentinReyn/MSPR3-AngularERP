import { Component, OnInit, Inject, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Global } from '../../../../../app/models/global.model';
import { PrixService } from '../../../../../app/services/prix.service';
import { AppSettings } from '../../../../../app/app.settings';
import { cpuUsage } from 'process';

@Component({
  selector: 'app-prix-add',
  templateUrl: './prix-add.component.html',
  styleUrls: ['./prix-add.component.css'],
})
export class PrixAddComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public prix: Global,
    public snackBar: MatSnackBar,
    private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<PrixAddComponent>,
    public prixService: PrixService
  ) {}

  onAdd = new EventEmitter();
  prixAddForm: FormGroup;
  appSettings = AppSettings;

  ngOnInit() {
    if (this.prix != null) {
      this.prixAddForm = this._formBuilder.group({
        product_name: [this.prix.product_name, Validators.required],
        tva: [this.prix.tva],
        price: [this.prix.price],
        id: [this.prix.id],
      });
    } else {
      this.prixAddForm = this._formBuilder.group({
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

  submitPrix() {
    if (this.prix == null) {
      this.prixService.listPrix().subscribe((data) => {
        var lastId = Math.max.apply(
          Math,
          data.map(function (o) {
            return o.id;
          })
        );
        this.prixAddForm.patchValue({
          id: lastId + 1,
        });
        this.prixService.savePrix(this.prixAddForm);
        this.snackBar.open('✅ prix successfully created ✅', null, {
          duration: AppSettings.TOAST_DURATION,
        });
        this.dialogRef.close();
        this.onAdd.emit();
      });
    } else {
      this.prixService.updatePrix(this.prixAddForm);
      this.snackBar.open('✅ prix successfully edited ✅', null, {
        duration: AppSettings.TOAST_DURATION,
      });
      this.dialogRef.close();
      this.onAdd.emit();
    }
  }
}

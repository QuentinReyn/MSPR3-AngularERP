import { Component, OnInit, Inject, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Global } from '../../../../../app/models/global.model';
import { TvaService } from '../../../../../app/services/tva.service';
import { AppSettings } from '../../../../../app/app.settings';

@Component({
  selector: 'app-tva-add',
  templateUrl: './tva-add.component.html',
  styleUrls: ['./tva-add.component.css']
})
export class TvaAddComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public tva: Global,
    public snackBar: MatSnackBar,
    private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<TvaAddComponent>,
    public tvaService: TvaService
  ) {}

  onAdd = new EventEmitter();
  tvaAddForm: FormGroup;
  appSettings = AppSettings;

  ngOnInit() {
    if (this.tva != null) {
      this.tvaAddForm = this._formBuilder.group({
        product_name: [this.tva.product_name, Validators.required],
        tva: [this.tva.tva],
        price: [this.tva.price],
        id: [this.tva.id],
      });
    } else {
      this.tvaAddForm = this._formBuilder.group({
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

  submitTva() {
    if (this.tva == null) {
      this.tvaService.listTva().subscribe((data) => {
        var lastId = Math.max.apply(
          Math,
          data.map(function (o) {
            return o.id;
          })
        );
        this.tvaAddForm.patchValue({
          id: lastId + 1,
        });
        this.tvaService.saveTva(this.tvaAddForm);
        this.snackBar.open('✅ tva successfully created ✅', null, {
          duration: AppSettings.TOAST_DURATION,
        });
        this.dialogRef.close();
        this.onAdd.emit();
      });
    } else {
      this.tvaService.updateTva(this.tvaAddForm);
      this.snackBar.open('✅ tva successfully edited ✅', null, {
        duration: AppSettings.TOAST_DURATION,
      });
      this.dialogRef.close();
      this.onAdd.emit();
    }
  }
}
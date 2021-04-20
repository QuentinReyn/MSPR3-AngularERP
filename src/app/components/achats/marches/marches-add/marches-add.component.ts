import { Component, OnInit, Inject, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Global } from '../../../../../app/models/global.model';
import { MarchesService } from '../../../../../app/services/marches.service';
import { AppSettings } from '../../../../../app/app.settings';


@Component({
  selector: 'app-marches-add',
  templateUrl: './marches-add.component.html',
  styleUrls: ['./marches-add.component.css']
})
export class MarchesAddComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public marche: Global,
    public snackBar: MatSnackBar,
    private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<MarchesAddComponent>,
    public marcheService: MarchesService
  ) {}

  onAdd = new EventEmitter();
  marcheAddForm: FormGroup;
  appSettings = AppSettings;

  ngOnInit() {
    if (this.marche != null) {
      this.marcheAddForm = this._formBuilder.group({
        product_name: [this.marche.product_name, Validators.required],
        tva: [this.marche.tva],
        price: [this.marche.price],
        id: [this.marche.id],
      });
    } else {
      this.marcheAddForm = this._formBuilder.group({
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

  submitMarche() {
    if (this.marche == null) {
      this.marcheService.listMarche().subscribe((data) => {
        var lastId = Math.max.apply(
          Math,
          data.map(function (o) {
            return o.id;
          })
        );
        this.marcheAddForm.patchValue({
          id: lastId + 1,
        });
        this.marcheService.saveMarche(this.marcheAddForm);
        this.snackBar.open('✅ marche successfully created ✅', null, {
          duration: AppSettings.TOAST_DURATION,
        });
        this.dialogRef.close();
        this.onAdd.emit();
      });
    } else {
      this.marcheService.updateMarche(this.marcheAddForm);
      this.snackBar.open('✅ marche successfully edited ✅', null, {
        duration: AppSettings.TOAST_DURATION,
      });
      this.dialogRef.close();
      this.onAdd.emit();
    }
  }
}

import { Component, OnInit, Inject, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Global } from '../../../../../app/models/global.model';
import { AppSettings } from '../../../../../app/app.settings';
import { RhFinanceService } from 'src/app/services/rh-finance.service';

@Component({
  selector: 'app-rh-finance-add',
  templateUrl: './rh-finance-add.component.html',
  styleUrls: ['./rh-finance-add.component.css']
})
export class RhFinanceAddComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public rhFinance: Global,
    public snackBar: MatSnackBar,
    private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<RhFinanceAddComponent>,
    public rhFinanceService: RhFinanceService
  ) {}

  onAdd = new EventEmitter();
  rhFinanceAddForm: FormGroup;
  appSettings = AppSettings;

  ngOnInit() {
    if (this.rhFinance != null) {
      this.rhFinanceAddForm = this._formBuilder.group({
        product_name: [this.rhFinance.product_name, Validators.required],
        tva: [this.rhFinance.tva],
        price: [this.rhFinance.price],
        id: [this.rhFinance.id],
      });
    } else {
      this.rhFinanceAddForm = this._formBuilder.group({
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

  submitRhFinance() {
    if (this.rhFinance == null) {
      this.rhFinanceService.listRhFinance().subscribe((data) => {
        var lastId = Math.max.apply(
          Math,
          data.map(function (o) {
            return o.id;
          })
        );
        this.rhFinanceAddForm.patchValue({
          id: lastId + 1,
        });
        this.rhFinanceService.saveRhFinance(this.rhFinanceAddForm);
        this.snackBar.open('✅ rhFinance successfully created ✅', null, {
          duration: AppSettings.TOAST_DURATION,
        });
        this.dialogRef.close();
        this.onAdd.emit();
      });
    } else {
      this.rhFinanceService.updateRhFinance(this.rhFinanceAddForm);
      this.snackBar.open('✅ rhFinance successfully edited ✅', null, {
        duration: AppSettings.TOAST_DURATION,
      });
      this.dialogRef.close();
      this.onAdd.emit();
    }
  }
}

import { Component, OnInit, Inject, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Global } from '../../../../../app/models/global.model';
import { CommandesService } from '../../../../../app/services/commandes.service';
import { AppSettings } from '../../../../../app/app.settings';

@Component({
  selector: 'app-commandes-add',
  templateUrl: './commandes-add.component.html',
  styleUrls: ['./commandes-add.component.css']
})
export class CommandesAddComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public commande: Global,
    public snackBar: MatSnackBar,
    private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<CommandesAddComponent>,
    public commandeService: CommandesService
  ) {}

  onAdd = new EventEmitter();
  commandeAddForm: FormGroup;
  appSettings = AppSettings;

  ngOnInit() {
    if (this.commande != null) {
      this.commandeAddForm = this._formBuilder.group({
        product_name: [this.commande.product_name, Validators.required],
        tva: [this.commande.tva],
        price: [this.commande.price],
        id: [this.commande.id],
      });
    } else {
      this.commandeAddForm = this._formBuilder.group({
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

  submitCommande() {
    if (this.commande == null) {
      this.commandeService.listCommande().subscribe((data) => {
        var lastId = Math.max.apply(
          Math,
          data.map(function (o) {
            return o.id;
          })
        );
        this.commandeAddForm.patchValue({
          id: lastId + 1,
        });
        this.commandeService.saveCommande(this.commandeAddForm);
        this.snackBar.open('✅ commande successfully created ✅', null, {
          duration: AppSettings.TOAST_DURATION,
        });
        this.dialogRef.close();
        this.onAdd.emit();
      });
    } else {
      this.commandeService.updateCommande(this.commandeAddForm);
      this.snackBar.open('✅ commande successfully edited ✅', null, {
        duration: AppSettings.TOAST_DURATION,
      });
      this.dialogRef.close();
      this.onAdd.emit();
    }
  }
}


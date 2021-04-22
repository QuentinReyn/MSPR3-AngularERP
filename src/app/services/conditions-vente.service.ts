import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { AppSettings } from '../app.settings';
import { Global } from '../models/global.model';

@Injectable({
  providedIn: 'root'
})
export class ConditionsVenteService {

  constructor(private http: HttpClient) { }

  listConditionsVente(): Observable<Global[]> {
      return this.http.get<Global[]>(AppSettings.API_ENDPOINT + "/conditionsVente");
  }


  saveConditionsVente(resourceFormAdd: FormGroup) {
      let body = { product_name : resourceFormAdd.value.product_name,tva:resourceFormAdd.value.tva,price:resourceFormAdd.value.price,id:resourceFormAdd.value.id};
      return this.http.post(AppSettings.API_ENDPOINT + "/conditionsVente/", body).subscribe();
  }

  updateConditionsVente(resourceFormAdd: FormGroup) {
    let body = { product_name : resourceFormAdd.value.product_name,tva:resourceFormAdd.value.tva,price:resourceFormAdd.value.price,id:resourceFormAdd.value.id};
    return this.http.put(AppSettings.API_ENDPOINT + "/conditionsVente/"+resourceFormAdd.value.id, body).subscribe();
}

  deleteConditionsVenteById(id) {
      return this.http.delete(AppSettings.API_ENDPOINT + "/conditionsVente/" + id);
  }
}
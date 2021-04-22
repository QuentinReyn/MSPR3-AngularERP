import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { AppSettings } from '../app.settings';
import { Global } from '../models/global.model';

@Injectable({
  providedIn: 'root'
})
export class RhFinanceService {

  constructor(private http: HttpClient) { }

  listRhFinance(): Observable<Global[]> {
      return this.http.get<Global[]>(AppSettings.API_ENDPOINT + "/rhFinances");
  }


  saveRhFinance(resourceFormAdd: FormGroup) {
      let body = { product_name : resourceFormAdd.value.product_name,tva:resourceFormAdd.value.tva,price:resourceFormAdd.value.price,id:resourceFormAdd.value.id};
      return this.http.post(AppSettings.API_ENDPOINT + "/rhFinances/", body).subscribe();
  }

  updateRhFinance(resourceFormAdd: FormGroup) {
    let body = { product_name : resourceFormAdd.value.product_name,tva:resourceFormAdd.value.tva,price:resourceFormAdd.value.price,id:resourceFormAdd.value.id};
    return this.http.put(AppSettings.API_ENDPOINT + "/rhFinances/"+resourceFormAdd.value.id, body).subscribe();
}

  deleteRhFinanceById(id) {
      return this.http.delete(AppSettings.API_ENDPOINT + "/rhFinances/" + id);
  }
}
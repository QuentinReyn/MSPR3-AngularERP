import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { AppSettings } from '../app.settings';
import { Global } from '../models/global.model';

@Injectable({
  providedIn: 'root'
})
export class MarchesService {

  constructor(private http: HttpClient) { }

  listMarche(): Observable<Global[]> {
      return this.http.get<Global[]>(AppSettings.API_ENDPOINT + "/marches");
  }


  saveMarche(resourceFormAdd: FormGroup) {
      let body = { product_name : resourceFormAdd.value.product_name,tva:resourceFormAdd.value.tva,price:resourceFormAdd.value.price,id:resourceFormAdd.value.id};
      return this.http.post(AppSettings.API_ENDPOINT + "/marches/", body).subscribe();
  }

  updateMarche(resourceFormAdd: FormGroup) {
    let body = { product_name : resourceFormAdd.value.product_name,tva:resourceFormAdd.value.tva,price:resourceFormAdd.value.price,id:resourceFormAdd.value.id};
    return this.http.put(AppSettings.API_ENDPOINT + "/marches/"+resourceFormAdd.value.id, body).subscribe();
}

  deleteMarcheById(id) {
      return this.http.delete(AppSettings.API_ENDPOINT + "/marches/" + id);
  }
}
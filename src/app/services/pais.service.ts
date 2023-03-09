import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators'; //muta la respuesta la transforma

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  constructor(private http: HttpClient) { }

  getPaises() {
    return this.http.get<any>('https://restcountries.com/v2/lang/es')
      .pipe(
        map((res: any[]) =>
          res.map(pais => ({ nombre: pais.name, codigo: pais.alpha3Code })
          )
        )
      );
  }
}

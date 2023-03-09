import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

interface ErrorValidate {
  [s: string]: boolean //puede regresar cualquier cantidad de llaves y dichas llaves seran booleanas
}

@Injectable({
  providedIn: 'root'
})
export class ValidadoresService {

  constructor() { }

  existeUsuario(control: FormControl): Promise<ErrorValidate> | Observable<ErrorValidate> {

    if (!control.value) {//si el control esta vacio
      return Promise.resolve(null); //retorna una promesa resuelta
    }

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'strider') {
          resolve({ existe: true })
        } else {
          resolve(null);
        }
      }, 3500)
    })
  }


  //tipo de salida un objeto {[]} se indica q se tiene una propiedad  de tipo string y retornara un boolean y pueden ser varias 
  noHerrera(control: FormControl): ErrorValidate {

    if (control.value?.toLowerCase() === 'herrera') { // ? : si el valor existe pasalo a lowercase sino evaluas con herrera y nuca va a entrar
      return {
        noHerrera: true
      }
    }
    return null;
  }

  passwordsIguales(pass1Name: string, pass2Name: string) {

    //retorna formgroup porque se recibe a nivel de formulario
    //regresa una funcion q se ejecuta del otro lado.
    return (formGroup: FormGroup) => {
      const pass1Control = formGroup.controls[pass1Name];
      const pass2Control = formGroup.controls[pass2Name];

      if (pass1Control.value === pass2Control.value) {
        pass2Control.setErrors(null);
      } else {
        pass2Control.setErrors({ noEsIgual: true });
      }
    }
  }

}

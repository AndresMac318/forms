import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PaisService } from 'src/app/services/pais.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})
export class TemplateComponent implements OnInit {

  usuario = {
    nombre: 'Luis',
    apellido: 'Macea',
    correo: 'luis@correo.com',
    pais: 'COL',
    genero: 'M'
  }

  paises: any[] = [];

  constructor(private paisService: PaisService) { }

  ngOnInit(): void {
    this.paisService.getPaises()
      .subscribe(paises => {
        this.paises = paises;

        this.paises.unshift({
          nombre: '[Seleccione país]',
          codigo: ''
        })

        console.log(this.paises);


      });
  }

  guardar(forma: NgForm) {
    console.log(forma);
    if (forma.invalid) {
      /* Object.values(): extrae tds los valores que tenga (forma.controls) se barren tds los controles*/
      /* .forEach() barre cada control y se marcan como tocados activando las validaciones */
      Object.values(forma.controls).forEach(control => {
        control.markAsTouched();
      })
      return;
    }
    console.log(forma.value.value);

  }

}

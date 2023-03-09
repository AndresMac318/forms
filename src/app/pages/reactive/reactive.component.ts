import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidadoresService } from 'src/app/services/validadores.service';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css']
})
export class ReactiveComponent implements OnInit {

  forma!: FormGroup;

  constructor(private fb: FormBuilder,
    private validadores: ValidadoresService) {
    this.crearFormulario();
    this.cargarData();
    this.crearListeners();
  }

  ngOnInit(): void {
  }

  get pasatiempos() {
    return this.forma.get('pasatiempos') as FormArray
  }
  get nombreNoValido() {
    return this.forma.get('nombre')?.invalid && this.forma.get('nombre')?.touched
  }
  get apellidoNoValido() {
    return this.forma.get('apellido')?.invalid && this.forma.get('apellido')?.touched
  }
  get correoNoValido() {
    return this.forma.get('correo')?.invalid && this.forma.get('correo')?.touched
  }
  get usuarioNoValido() {
    return this.forma.get('usuario')?.invalid && this.forma.get('usuario')?.touched
  }
  get barrioNoValido() {
    return this.forma.get('direccion.barrio')?.invalid && this.forma.get('direccion.barrio')?.touched
  }
  get ciudadNoValido() {
    return this.forma.get('direccion.ciudad')?.invalid && this.forma.get('direccion.ciudad')?.touched
  }
  get pass1NoValido() {
    return this.forma.get('pass1')?.invalid && this.forma.get('pass1')?.touched
  }
  get pass2NoValido() {
    const pass1 = this.forma.get('pass1').value;
    const pass2 = this.forma.get('pass2').value;
    return (pass1 === pass2) ? false : true;
  }


  crearFormulario() {
    this.forma = this.fb.group({
      //propiedad: [valor por defecto, validacion sincrona, validacion asincrona] | propiedad:['juan', [Validators.required, ...]] | propiedad: ['', , this.validadores.existeUser]
      nombre: ['', [Validators.required, Validators.minLength(4)]],
      apellido: ['', [Validators.required, this.validadores.noHerrera]], //no lleva parentesis, solo se referencia
      correo: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      usuario: ['', , this.validadores.existeUsuario], //no se necesita la val sincrona
      pass1: ['', Validators.required],
      pass2: ['', Validators.required],
      direccion: this.fb.group({
        barrio: ['', Validators.required],
        ciudad: ['', Validators.required]
      }),
      pasatiempos: this.fb.array([])
    }, {//nivel de formulario, validators:[] => mas de 1 validador, lleva parentesis 'se ejecuta' debe el metodo devolver una funcion que sirva para vlaidar el form
      validators: this.validadores.passwordsIguales('pass1', 'pass2') //a nivel de formulario, no se puede hacer al nivel de arriba porque puede que no exista el elemento, este mas arriba q el otro , etc
    });
  }

  crearListeners() {
    /* this.forma.valueChanges.subscribe(valor => {
      console.log(valor);
    });

    this.forma.statusChanges.subscribe(status => {
      console.log(status);
    }) */

    this.forma.get('nombre').valueChanges.subscribe(console.log);
  }

  cargarData() {
    //this.forma.setValue({
    this.forma.reset({
      nombre: "Juan",
      apellido: "Luna",
      correo: "juan@correo.com",
      pass1: '123',
      pass2: '123',
      direccion: {
        "barrio": "Boston",
        "ciudad": "Kingstone"
      },
    });
    //cargar datos por defecto: 
    ['Comer', 'Dormir'].forEach(valor => this.pasatiempos.push(this.fb.control(valor)));
    //o tambien a traves del setValue, pero se deben llenar todos los campos
  }

  agregarPasatiempo() {
    this.pasatiempos.push(this.fb.control(''));
  }

  borrarPasatiempo(i: number) {
    this.pasatiempos.removeAt(i);
  }

  guardar() {
    console.log(this.forma);
    if (this.forma.invalid) {
      return Object.values(this.forma.controls).forEach(control => {
        if (control instanceof FormGroup) {
          Object.values(control.controls).forEach(control => control.markAsTouched());
        } else {
          control.markAsTouched();
        }
      });
    }

    //posteo de la info
    //borrar contenido el reset: borra el estado del form
    /* this.forma.reset({
      nombre: 'Sin nombre'
    }); */
    this.forma.reset();
  }

}

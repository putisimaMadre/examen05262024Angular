import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Status {
  status: string;
  valor: string;
}

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrl: './new-user.component.css'
})
export class NewUserComponent {
  selectedValue: string = "";

  status: Status[] = [
    {status: 'A', valor: 'Activos'},
    {status: 'I', valor: 'Inactivos'},
    {status: 'R', valor: 'Revocados'},
  ];

public myformNewUser: FormGroup = this.fb.group({
    login: ['', [Validators.required]],
    password: ['', [Validators.required]],
    nombre: ['', [Validators.required]],
    cliente: ['', [Validators.required]],
    email: ['', [Validators.required]],
    fechaalta: ['', [Validators.required]],
    fechabaja: ['', [Validators.required]],
    status: ['', [Validators.required]],
    intentos: ['', [Validators.required]],
    fecharevocado: ['', [Validators.required]],
    fecha_vigencia: ['', [Validators.required]],
    no_acceso: ['', [Validators.required]],
    apellido_paterno: ['', [Validators.required]],
    apellido_materno: ['', [Validators.required]],
    area: ['', [Validators.required]],
    fechamodificacion: ['', [Validators.required]],
})

  constructor(private fb: FormBuilder){}

  guardarUsuario(): void{
    
  }
}

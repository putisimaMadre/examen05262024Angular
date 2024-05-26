import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';

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
    login: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.minLength(3)]],
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    cliente: ['', [Validators.required, Validators.minLength(3)]],
    email: [''],
    fechaalta: ['', ],
    fechabaja: [''],
    status: [''],
    intentos: [''],
    fecharevocado: [''],
    fechaVigencia: [''],
    noAcceso: [''],
    apellidoPaterno: [''],
    apellidoMaterno: [''],
    area: [''],
    fechamodificacion: [''],
})

  constructor(private fb: FormBuilder, private usuarioService: UsuarioService,
    private router: Router
  ){}

  guardarUsuario(): void{
    console.log(this.myformNewUser.value)
    if(this.myformNewUser.invalid) return;
    if(this.myformNewUser.value['fechaalta'] == ""){
      this.myformNewUser.value['fechaalta'] = new Date();
      console.log(this.myformNewUser.value['fechaalta'])
    }
    if(this.myformNewUser.value['fechamodificacion'] == ""){
      this.myformNewUser.value['fechamodificacion'] = new Date();
      console.log(this.myformNewUser.value['fechamodificacion'])
    }
    if(this.myformNewUser.value['fechaVigencia'] == ""){
      this.myformNewUser.value['fechaVigencia'] = new Date();
      console.log(this.myformNewUser.value['fechaVigencia'])
    }
    this.usuarioService.saveUsuario(this.myformNewUser.value).subscribe(() => this.router.navigate(['/menu']))
  }

  /*checkUser(): void{
    if(this.myForm.invalid) return;
    this.usuarioService.getUsuario(this.myForm.value).subscribe(valor => {
      this.router.navigate(['./menu']);
    })
  }*/
}

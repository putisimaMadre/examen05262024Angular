import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from '../../models/usuario';

interface Status {
  status: string;
  valor: string;
}

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrl: './new-user.component.css'
})
export class NewUserComponent implements OnInit{
  selectedValue: string = "";
  usuario!: Usuario;

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
    private router: Router, private activedRouter: ActivatedRoute
  ){}

  ngOnInit(): void {
    this.cargarCliente()
    //this.loadEditData()
  }

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

  cargarCliente(): void{
    this.activedRouter.params.subscribe(params => {
      let id = params['id']
      if(id){
        this.usuarioService.getUsuarioEditar(id).subscribe(
          usuario => {
            this.usuario = usuario
            this.myformNewUser.setValue({
              login: this.usuario.login,
              password: this.usuario.password,
              nombre: this.usuario.nombre,
              cliente: this.usuario.cliente,
              email: this.usuario.email,
              fechaalta: this.usuario.fechaalta,
              fechabaja: this.usuario.fechabaja,
              status: this.usuario.status,
              intentos: this.usuario.intentos,
              fecharevocado: this.usuario.fecharevocado,
              fechaVigencia: this.usuario.fechaVigencia,
              noAcceso: this.usuario.noAcceso,
              apellidoPaterno: this.usuario.apellidoPaterno,
              apellidoMaterno: this.usuario.apellidoMaterno,
              area: this.usuario.area,
              fechamodificacion: this.usuario.fechamodificacion,
            })
          })
      }
    })
  }

  updateUsuario(): void{
    this.usuarioService.updateUsuarioS(this.myformNewUser.value).subscribe(() => this.router.navigate(['/tablero']))
  }
}

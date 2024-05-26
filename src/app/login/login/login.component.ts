import { Component } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  public myForm: FormGroup = this.fb.group({
    login: ['', [Validators.required]],
    password: ['', [Validators.required]]
  })
  constructor(private usuarioService: UsuarioService, private fb: FormBuilder,
    private router: Router
  ){}

  checkUser(): void{
    if(this.myForm.invalid) return;
    this.usuarioService.getUsuario(this.myForm.value).subscribe(valor => {
      this.router.navigate(['./menu']);
    })
  }

}

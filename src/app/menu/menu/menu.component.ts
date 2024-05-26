import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit {
  constructor(private usuarioService: UsuarioService, private router: Router){}
  ver: boolean = false;
  
  ngOnInit(): void {
    if(this.usuarioService.currentUser == undefined){
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Aun no estas autorizado"
      });
      this.router.navigate(['./login'])
    }
  }

  sesion(): void{
    localStorage.removeItem("token");
    this.router.navigate(['./login'])
  }

}

import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario';
import {MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

/*export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}*/

/*const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];*/

@Component({
  selector: 'app-tablero',
  templateUrl: './tablero.component.html',
  styleUrl: './tablero.component.css'
})



export class TableroComponent implements OnInit {
  public usuarios: Usuario[] = []
  public dataSource = new MatTableDataSource(this.usuarios)

  /*public myformTablero: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    fechaalta: [''],
    fechafinal: [''],
})*/
  
  constructor(private usuarioService: UsuarioService){}
  
  ngOnInit(): void {
    this.usuarioService.getUsuarios().subscribe(usuario => {
      this.usuarios = usuario
      this.dataSource = new MatTableDataSource(this.usuarios)
  })

  }

  displayedColumns: string[] = ['nombre', 'login', 'fechaAlta', 'status', 'accion'];
  //dataSource = new MatTableDataSource(this.usuarios);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  busquedaLetra(letra: string): void{
    this.usuarioService.busquedaLetra(letra).subscribe(usuario => {
      this.usuarios = usuario
      this.dataSource = new MatTableDataSource(this.usuarios)
    })
  }

  busqueda(event: Event){
    /*this.dataSource.filterPredicate = function(data, filter: string): boolean {
      return data.nombre.toLowerCase().includes(filter) || data.login.toLowerCase().includes(filter) || data.fechaalta.toString().includes(filter);
    };*/
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filterPredicate = (data, filter) => { const filterArray = filter.split('$'); return (!filterArray[0] || data.nombre.toLowerCase().indexOf(filterArray[0].trim().toLowerCase()) > -1) && (!filterArray[1] || data.login.indexOf(filterArray[1]) > -1) ; };
  }


  deleteUsuario(usuario: Usuario): void{
    console.log("llegando")
    this.usuarioService.deleteUsuario(usuario.login).subscribe(response => this.usuarios = this.usuarios.filter(usr => usr !== usuario))
  }
  
}

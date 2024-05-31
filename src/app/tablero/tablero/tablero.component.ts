import { Component, OnInit, ViewChild } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario';
import {MatTableDataSource} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';

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
  
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;
  constructor(private usuarioService: UsuarioService, private router: Router){}
  
  ngOnInit(): void {
    this.usuarioService.getUsuarios().subscribe(usuario => {
      this.usuarios = usuario
      this.dataSource = new MatTableDataSource(this.usuarios)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
  })

  /*
    this.alumnoService.getAlumnos().subscribe(result => {
      this.empdata = result;

      this.dataSource = new MatTableDataSource<Alumno>(this.empdata)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
    */

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
    this.usuarioService.deleteUsuario(usuario.login).subscribe(response => {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Alumno Eliminado correctamente',
        showConfirmButton: false,
        timer: 2000
      })

        this.usuarioService.getUsuarios().subscribe(usuarios => {
          this.dataSource = new MatTableDataSource(usuarios)
        })
      
      this.router.navigate(['/tablero'])
    })
  }
  
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuarioRoutingModule } from './usuario-routing.module';
import { MaterialModule } from '../material/material.module';
import { NewUserComponent } from './new-user/new-user.component';
import { ListUserComponent } from './list-user/list-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {provideNativeDateAdapter} from '@angular/material/core';


@NgModule({
  declarations: [
    NewUserComponent,
    ListUserComponent
  ],
  imports: [
    CommonModule,
    UsuarioRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers:[
    provideNativeDateAdapter()
  ]
})
export class UsuarioModule { }

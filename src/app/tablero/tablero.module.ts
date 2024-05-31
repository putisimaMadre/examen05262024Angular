import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableroRoutingModule } from './tablero-routing.module';
import { TableroComponent } from './tablero/tablero.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {provideNativeDateAdapter} from '@angular/material/core';
import { MenuModule } from '../menu/menu.module';

@NgModule({
  declarations: [
    TableroComponent
  ],
  imports: [
    CommonModule,
    TableroRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    MenuModule
  ],
  providers:[
    provideNativeDateAdapter()
  ]
})
export class TableroModule { }

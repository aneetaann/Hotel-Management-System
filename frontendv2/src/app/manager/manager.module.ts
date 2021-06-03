import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ManagerComponent } from './manager.component';
import { MloginComponent } from './mlogin/mlogin.component';
import { MployeeComponent } from './mployee/mployee.component';
import { MroomsComponent } from './mrooms/mrooms.component';
import { MbookingComponent } from './mbooking/mbooking.component';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    ManagerComponent,
    MloginComponent,
    MployeeComponent,
    MroomsComponent,
    MbookingComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatExpansionModule,
    MatInputModule
  ]
})

export class ManagerModule { }

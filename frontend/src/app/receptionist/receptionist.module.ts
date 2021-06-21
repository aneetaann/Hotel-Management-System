import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RbookingComponent } from './rbooking/rbooking.component';
import { RroomsComponent } from './rrooms/rrooms.component';
import { ReceptionistComponent } from './receptionist.component';
import { RloginComponent } from './rlogin/rlogin.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RdashboardComponent } from './rdashboard/rdashboard.component';

@NgModule({
  declarations: [
    RbookingComponent,
    RroomsComponent,
    ReceptionistComponent,
    RloginComponent,
    RdashboardComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatExpansionModule,
    MatInputModule
  ]
})

export class ReceptionistModule { }

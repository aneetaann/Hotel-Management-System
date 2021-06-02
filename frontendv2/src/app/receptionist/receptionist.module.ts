import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RbookingComponent } from './rbooking/rbooking.component';
import { RroomsComponent } from './rrooms/rrooms.component';
import { ReceptionistComponent } from './receptionist.component';
import { RloginComponent } from './rlogin/rlogin.component';



@NgModule({
  declarations: [RbookingComponent,
  RroomsComponent,
ReceptionistComponent,
RloginComponent],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class ReceptionistModule { }

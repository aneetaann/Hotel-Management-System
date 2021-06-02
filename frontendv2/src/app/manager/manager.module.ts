import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ManagerComponent } from './manager.component';
import { MloginComponent } from './mlogin/mlogin.component';
import { MployeeComponent } from './mployee/mployee.component';
import { MroomsComponent } from './mrooms/mrooms.component';
import { MbookingComponent } from './mbooking/mbooking.component';



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
    RouterModule
  ]
})
export class ManagerModule { }

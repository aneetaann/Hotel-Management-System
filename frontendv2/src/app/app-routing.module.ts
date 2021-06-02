import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { BookingComponent } from './admin/booking/booking.component';
import { EmployeeComponent } from './admin/employee/employee.component';
import { LoginComponent } from './admin/login/login.component';
import { RoomsComponent } from './admin/rooms/rooms.component';

import { ManagerComponent } from './manager/manager.component';
import { MbookingComponent } from './manager/mbooking/mbooking.component';
import { MloginComponent } from './manager/mlogin/mlogin.component';
import { MployeeComponent } from './manager/mployee/mployee.component';
import { MroomsComponent } from './manager/mrooms/mrooms.component';
import { RbookingComponent } from './receptionist/rbooking/rbooking.component';
import { ReceptionistComponent } from './receptionist/receptionist.component';
import { RloginComponent } from './receptionist/rlogin/rlogin.component';
import { RroomsComponent } from './receptionist/rrooms/rrooms.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'booking',
        component: BookingComponent
      },
      {
        path: 'employee',
        component: EmployeeComponent
      },
      {
        path: 'room',
        component: RoomsComponent
      },
      {
        path: '',
        component: LoginComponent
      }
    ]
  },
  {
    path: 'manager',
    component: ManagerComponent,
    children: [
      {
        path:'',
        component: MloginComponent
      },
      {
        path: 'room',
        component: MroomsComponent
      },
      {
        path: 'booking',
        component: MbookingComponent
      },
      {
        path: 'employee',
        component: MployeeComponent
      }
    ]
  },
  {
    path: 'receptionist',
    component: ReceptionistComponent,
    children: [
      {
        path: '',
        component: RloginComponent
      },
      {
        path: 'room',
        component: RroomsComponent
      },
      {
        path: 'booking',
        component: RbookingComponent
      }
    ]

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

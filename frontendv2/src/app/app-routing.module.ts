import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { BookingComponent } from './admin/booking/booking.component';
import { EmployeeComponent } from './admin/employee/employee.component';
import { LoginComponent } from './admin/login/login.component';
import { RoomsComponent } from './admin/rooms/rooms.component';

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

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

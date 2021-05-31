import { NgModule } from '@angular/core';
import { MatButtonModule} from '@angular/material/button';
import { MatTableModule} from '@angular/material/table';

import {MatFormFieldModule} from '@angular/material/form-field';

const MaterialComponents =[ 
  MatButtonModule,
  MatTableModule,
  MatFormFieldModule
];

@NgModule({
  imports: [MaterialComponents],
  exports:[MaterialComponents]
})
export class MaterialModule { }

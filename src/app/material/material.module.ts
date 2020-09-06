import { NgModule } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSelectModule} from '@angular/material/select';
import {MatMenuModule} from '@angular/material/menu';
const MaterialComponents =[
  MatButtonModule,
  MatToolbarModule,
  MatButtonToggleModule,
  MatTableModule,
  MatInputModule,
  MatRadioModule,
  MatDialogModule,
  MatSelectModule,
  MatMenuModule
  
];


@NgModule({
  
  imports: [
    MaterialComponents
  ],
  exports:[
   MaterialComponents
  ]
})
export class MaterialModule { }

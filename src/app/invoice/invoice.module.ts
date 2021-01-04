import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout'
import { IonicModule } from '@ionic/angular';

import { InvoicePageRoutingModule } from './invoice-routing.module';
import {MaterialModule} from '../material/material.module';
import { InvoicePage } from './invoice.page';
import { AuthGuardService } from '../services/AuthGuardService.service';
import { FilterComponent } from '../filter/filter.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FlexLayoutModule,
  ReactiveFormsModule,
    MaterialModule,
    InvoicePageRoutingModule
  ],
  declarations: [InvoicePage,FilterComponent]
  
})
export class InvoicePageModule {}

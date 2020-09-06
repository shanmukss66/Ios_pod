import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {FlexLayoutModule} from '@angular/flex-layout'
import { IonicModule } from '@ionic/angular';

import { InvoicePageRoutingModule } from './invoice-routing.module';
import {MaterialModule} from '../material/material.module';
import { InvoicePage } from './invoice.page';
import { AuthGuardService } from '../services/AuthGuardService.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FlexLayoutModule,
  
    MaterialModule,
    InvoicePageRoutingModule
  ],
  declarations: [InvoicePage]
  
})
export class InvoicePageModule {}

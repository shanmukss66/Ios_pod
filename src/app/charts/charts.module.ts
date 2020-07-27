import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChartsPageRoutingModule } from './charts-routing.module';
import {ChartsModule} from 'ng2-charts';
import { ChartsPage } from './charts.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChartsModule,
    ChartsPageRoutingModule,
    
  ],
  declarations: [ChartsPage]
})
export class ChartsPageModule {}

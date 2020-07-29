import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import {FlexLayoutModule} from '@angular/flex-layout';
import { DescriptionPageRoutingModule } from './description-routing.module';

import { DescriptionPage } from './description.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FlexLayoutModule,
    DescriptionPageRoutingModule
  ],
  declarations: [DescriptionPage]
})
export class DescriptionPageModule {}

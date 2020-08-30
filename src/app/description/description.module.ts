import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import { IonicModule } from '@ionic/angular';
import {FlexLayoutModule} from '@angular/flex-layout';
import { DescriptionPageRoutingModule } from './description-routing.module';

import { DescriptionPage } from './description.page';
import { AuthGuardService } from '../services/AuthGuardService.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatDialogModule,
    FlexLayoutModule,
    DescriptionPageRoutingModule
  ],
  declarations: [DescriptionPage]
})
export class DescriptionPageModule {}

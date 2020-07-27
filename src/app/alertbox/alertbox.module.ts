import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AlertboxPageRoutingModule } from './alertbox-routing.module';

import { AlertboxPage } from './alertbox.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AlertboxPageRoutingModule
  ],
  declarations: [AlertboxPage]
})
export class AlertboxPageModule {}

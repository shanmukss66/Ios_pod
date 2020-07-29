import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabletModePageRoutingModule } from './tablet-mode-routing.module';

import { TabletModePage } from './tablet-mode.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabletModePageRoutingModule
  ],
  declarations: [TabletModePage]
})
export class TabletModePageModule {}

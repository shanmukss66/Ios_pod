import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabletModePage } from './tablet-mode.page';

const routes: Routes = [
  {
    path: '',
    component: TabletModePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabletModePageRoutingModule {}

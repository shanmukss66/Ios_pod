import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlertboxPage } from './alertbox.page';

const routes: Routes = [
  {
    path: '',
    component: AlertboxPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlertboxPageRoutingModule {}

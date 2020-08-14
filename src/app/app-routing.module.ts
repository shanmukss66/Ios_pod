import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { DeliveryResolver } from './services/deliveryChartResolver.service';
import { ApprovedInvoiceResolver } from './services/ApprovedInvoiceResolver.service';

import { InvoiceDescriptionResolver } from './services/InvoiceDescriptionResolver.service';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'signin',
    loadChildren: () => import('./signin/signin.module').then( m => m.SigninPageModule)
  },
  {
    path: 'invoice/:user_data',
    loadChildren: () => import('./invoice/invoice.module').then( m => m.InvoicePageModule),
    resolve:{approved:ApprovedInvoiceResolver}

  },
  {
    path: 'charts/:user_data',
    loadChildren: () => import('./charts/charts.module').then( m => m.ChartsPageModule),
    resolve:{delivery: DeliveryResolver}
  },
  {
    path: 'description/:user_data/:header_id/:type',
    loadChildren: () => import('./description/description.module').then( m => m.DescriptionPageModule),
    resolve:{descrptn:InvoiceDescriptionResolver}
  },
  {
    path: 'alertbox',
    loadChildren: () => import('./alertbox/alertbox.module').then( m => m.AlertboxPageModule)
  },
  {
    path: 'tablet-mode',
    loadChildren: () => import('./tablet-mode/tablet-mode.module').then( m => m.TabletModePageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

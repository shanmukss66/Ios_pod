import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';


import { GetAllInvoiceResolver } from './services/ApprovedInvoiceResolver.service';

import { InvoiceDescriptionResolver } from './services/InvoiceDescriptionResolver.service';

import { AuthGuardService } from './services/AuthGuardService.service';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    canActivate :[AuthGuardService]
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
    path: 'invoice/:user_data/:selected_id',
    loadChildren: () => import('./invoice/invoice.module').then( m => m.InvoicePageModule),
    
    resolve:{approved:GetAllInvoiceResolver},
    
    canActivate :[AuthGuard]
    
  },
  {
    path: 'charts',
    loadChildren: () => import('./charts/charts.module').then( m => m.ChartsPageModule),
    
    
    canActivate :[AuthGuard]
    
  },
  {
    path: 'description/:user_data/:header_id/:type',
    loadChildren: () => import('./description/description.module').then( m => m.DescriptionPageModule),
    
    resolve:{descrptn:InvoiceDescriptionResolver},
    canActivate :[AuthGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {ChartsModule} from 'ng2-charts';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PendingdailogComponent } from './pendingdailog/pendingdailog.component';
import { DescriptiondailogComponent } from './descriptiondailog/descriptiondailog.component';
import { PopoverComponent } from './popover/popover.component';
import { FilterComponent } from './filter/filter.component';
import { AuthGuardService } from './services/AuthGuardService.service';
import { JwtModule } from "@auth0/angular-jwt";
import { AuthGuard } from './auth.guard';
import { AuthService } from './services/AuthService.service';
@NgModule({
  declarations: [AppComponent,PendingdailogComponent,DescriptiondailogComponent,PopoverComponent,FilterComponent],
  entryComponents: [PendingdailogComponent,DescriptiondailogComponent,PopoverComponent,FilterComponent],
  imports: [BrowserModule, ReactiveFormsModule,FormsModule,IonicModule.forRoot(),AppRoutingModule,FlexLayoutModule,HttpClientModule,ChartsModule, BrowserAnimationsModule],
  providers: [
    StatusBar,
    SplashScreen,
    AuthGuard,
    AuthService,
    
    { provide: RouteReuseStrategy,useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HashLocationStrategy, LocationStrategy} from '@angular/common'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './settings/material.module';
import { SiteModule } from './settings/site.module';
import { pages } from './settings/app.components';
import { NavigationComponent } from './navigation/navigation.component';
import { FooterComponent } from './footer/footer.component';
import { NewsComponent } from './pages/news/news.component';




const mainComponents = [AppComponent, NavigationComponent, pages, FooterComponent]
const siteMod =[BrowserModule,AppRoutingModule,BrowserAnimationsModule,MaterialModule,SiteModule]

@NgModule({
  declarations:[mainComponents, NewsComponent],
  imports: [siteMod],
  providers: [{provide:LocationStrategy, useClass:HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }

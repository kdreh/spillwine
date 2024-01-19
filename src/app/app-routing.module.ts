import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ConstructionComponent } from './pages/construction/construction.component';
import { AboutComponent } from './pages/about/about.component';
import { NewsComponent } from './pages/news/news.component';

const routes: Routes = [
  // {path:'', redirectTo: 'construction', pathMatch:'full'},
  {path:'', redirectTo: 'home', pathMatch:'full'},
  // {path:'construction', component:ConstructionComponent},
  {path:'home', component:HomeComponent},
  {path:'about', component:AboutComponent},
  {path:'news', component:NewsComponent},
  {path: 'contact', component:ContactComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

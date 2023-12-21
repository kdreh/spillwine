import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ConstructionComponent } from './pages/construction/construction.component';

const routes: Routes = [
  // {path:'', redirectTo: 'construction', pathMatch:'full'},
  {path:'', redirectTo: 'home', pathMatch:'full'},
  // {path:'construction', component:ConstructionComponent},
  {path:'home', component:HomeComponent},

  {path: 'contact', component:ContactComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

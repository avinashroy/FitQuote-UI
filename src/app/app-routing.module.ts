import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GoogleFitComponent } from './auth-complete/google-fit/google-fit.component';

const routes: Routes = [
    { path: 'auth-complete/google-fit', component: GoogleFitComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

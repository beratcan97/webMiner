import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DuinocoinComponent } from './components/duinocoin/duinocoin.component';

const routes: Routes = [
  { path: 'duinocoin', component: DuinocoinComponent }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)],
})
export class AppRoutingModule { }

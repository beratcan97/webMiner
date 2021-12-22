import { MoneroComponent } from './components/monero/monero.component';
import { FaqComponent } from './components/faq/faq.component';
import { StatsComponent } from './components/stats/stats.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DuinocoinComponent } from './components/duinocoin/duinocoin.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'duinocoin', component: DuinocoinComponent },
  { path: 'monero', component: MoneroComponent },
  { path: 'stats', component: StatsComponent },
  { path: 'faq', component: FaqComponent },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)],
})
export class AppRoutingModule { }

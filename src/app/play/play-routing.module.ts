import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlayComponent } from './play.component';
import { DailyComponent } from './daily/daily.component';
import { RandomComponent } from './random/random.component';

const routes: Routes = 
 [
  { path: '', component: PlayComponent },
  { path: 'daily', component: DailyComponent },
  { path: 'random', component: RandomComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlayRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlayComponent } from './play/play.component';
import { DailyComponent } from './daily/daily.component';
import { RandomComponent } from './random/random.component';

const routes: Routes = [
  {
    path: 'play',
    component: PlayComponent,
  },
  { path: 'play/daily', component: DailyComponent },
  { path: 'play/random', component: RandomComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

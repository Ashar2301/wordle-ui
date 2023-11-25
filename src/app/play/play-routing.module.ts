import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlayComponent } from './play.component';
import { DailyComponent } from './daily/daily.component';
import { RandomComponent } from './random/random.component';
import { AuthGuard } from '../shared/auth.guard';
const routes: Routes = [
  { path: '', component: PlayComponent },
  { path: 'daily', component: DailyComponent, canActivate: [AuthGuard] },
  { path: 'random', component: RandomComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlayRoutingModule {}

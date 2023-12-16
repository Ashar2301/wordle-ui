import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../shared/auth.guard';
import { DailyComponent } from './daily/daily.component';
import { PlayComponent } from './play.component';
import { RandomComponent } from './random/random.component';
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

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlayComponent } from './play/play.component';
import { DailyComponent } from './daily/daily.component';
import { RandomComponent } from './random/random.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
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

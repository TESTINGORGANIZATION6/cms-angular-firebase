import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CmsLoginComponent } from './cms-login/cms-login.component';
import { CmsDashboardComponent } from './cms-dashboard/cms-dashboard.component';
import { PlayersComponent } from './cms-dashboard/players/players.component';
import { CoachesComponent } from './cms-dashboard/coaches/coaches.component';
import { TeamsComponent } from './cms-dashboard/teams/teams.component';
import { ClubsComponent } from './cms-dashboard/clubs/clubs.component';
import { ActivitiesComponent } from './cms-dashboard/activities/activities.component';
import { PortfolioDashboardComponent } from './portfolio-dashboard/portfolio-dashboard.component';
import { RegisterAdminComponent } from './register-admin/register-admin.component';

const routes: Routes = [
  { path: '', component: CmsLoginComponent },
  {
    path: 'dashboard', component: CmsDashboardComponent,
    // children: [
    //   { path: '', redirectTo: 'players', pathMatch: 'full' },
    //   { path: 'players', component: PlayersComponent },
    //   { path: 'coaches', component: CoachesComponent },
    //   { path: 'teams', component: TeamsComponent },
    //   { path: 'clubs', component: ClubsComponent },
    //   { path: 'activities', component: ActivitiesComponent },
    //   { path: '**', redirectTo: '' },
    // ]
  },
  { path: 'portfolio', component: PortfolioDashboardComponent },
  { path: 'admin/register', component: RegisterAdminComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

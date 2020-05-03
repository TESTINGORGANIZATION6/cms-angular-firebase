import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS/* other http imports */ } from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule, MatButtonModule, MatSelectModule, MatIconModule } from '@angular/material';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import { CmsLoginComponent } from './cms-login/cms-login.component';
import { CmsDashboardComponent } from './cms-dashboard/cms-dashboard.component';
import { CmsHeaderComponent } from './cms-header/cms-header.component';
import { PlayersComponent } from './cms-dashboard/players/players.component';
import { CoachesComponent } from './cms-dashboard/coaches/coaches.component';
import { TeamsComponent } from './cms-dashboard/teams/teams.component';
import { ClubsComponent } from './cms-dashboard/clubs/clubs.component';
import { UpdateplayerComponent } from './cms-dashboard/players/updateplayer/updateplayer.component';
import { MustMatchDirective } from './helpers/mustmatchvalidator';
import { UpdateCoachComponent } from './cms-dashboard/coaches/update-coach/update-coach.component';
import { UpdateTeamsComponent } from './cms-dashboard/teams/update-teams/update-teams.component';
import { ActivitiesComponent } from './cms-dashboard/activities/activities.component';
import { PortfolioDashboardComponent } from './portfolio-dashboard/portfolio-dashboard.component';
import { UserprofilesComponent } from './portfolio-dashboard/userprofiles/userprofiles.component';
import { ScoutsComponent } from './portfolio-dashboard/scouts/scouts.component';
import { NgxSpinnerModule } from "ngx-spinner";
import {LoadingScreenInterceptor} from './helpers/intersepter';
import { RegisterAdminComponent } from './register-admin/register-admin.component';
import { CreateTeamComponent } from './cms-dashboard/teams/create-team/create-team.component';
import {MatCheckboxModule} from '@angular/material/checkbox';


@NgModule({
  declarations: [
    AppComponent,
    CmsLoginComponent,
    CmsDashboardComponent,
    CmsHeaderComponent,
    PlayersComponent,
    CoachesComponent,
    TeamsComponent,
    ClubsComponent,
    UpdateplayerComponent,
    MustMatchDirective,
    UpdateCoachComponent,
    UpdateTeamsComponent,
    ActivitiesComponent,
    PortfolioDashboardComponent,
    UserprofilesComponent,
    ScoutsComponent,
    RegisterAdminComponent,
    CreateTeamComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    HttpClientModule,
    MatTooltipModule,
    NgxSpinnerModule,
    ReactiveFormsModule,
    MatCardModule,
    MatTableModule,
    MatCheckboxModule
    ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: LoadingScreenInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }

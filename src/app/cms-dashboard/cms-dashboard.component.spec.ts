import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PlayersComponent } from './players/players.component';
import { CoachesComponent } from './coaches/coaches.component';
import { TeamsComponent } from './teams/teams.component';
import { ClubsComponent } from './clubs/clubs.component';
import { ActivitiesComponent } from './activities/activities.component';
import { CmsHeaderComponent } from '../cms-header/cms-header.component';
import { CmsDashboardComponent } from './cms-dashboard.component';

describe('CmsDashboardComponent', () => {
  let component: CmsDashboardComponent;
  let fixture: ComponentFixture<CmsDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CmsDashboardComponent ],
      imports:[
        PlayersComponent,
        CoachesComponent,
        TeamsComponent,
        ClubsComponent,
        ActivitiesComponent,
        CmsHeaderComponent
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CmsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

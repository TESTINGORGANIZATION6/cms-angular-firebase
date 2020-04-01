import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PortfolioDashboardComponent } from './portfolio-dashboard.component';
import { CmsHeaderComponent } from '../cms-header/cms-header.component';
import { UserprofilesComponent } from './userprofiles/userprofiles.component';
describe('PortfolioDashboardComponent', () => {
  let component: PortfolioDashboardComponent;
  let fixture: ComponentFixture<PortfolioDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortfolioDashboardComponent ],
      imports:[CmsHeaderComponent, UserprofilesComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortfolioDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { UpdateCoachComponent } from './update-coach.component';
import { MustMatchDirective } from '../../../helpers/mustmatchvalidator';

describe('UpdateCoachComponent', () => {
  let component: UpdateCoachComponent;
  let fixture: ComponentFixture<UpdateCoachComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateCoachComponent, MustMatchDirective ],
      imports:[FormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateCoachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

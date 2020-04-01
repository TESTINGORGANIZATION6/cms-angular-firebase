import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateplayerComponent } from './updateplayer.component';
import { FormsModule } from '@angular/forms';
import { MustMatchDirective } from '../../../helpers/mustmatchvalidator';

describe('UpdateplayerComponent', () => {
  let component: UpdateplayerComponent;
  let fixture: ComponentFixture<UpdateplayerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateplayerComponent,MustMatchDirective ],
      imports: [FormsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateplayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

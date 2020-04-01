import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { CmsLoginComponent } from './cms-login.component';
import {RouterTestingModule} from '@angular/router/testing'

describe('CmsLoginComponent', () => {
  let component: CmsLoginComponent;
  let fixture: ComponentFixture<CmsLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CmsLoginComponent ],
      imports:[FormsModule, RouterTestingModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CmsLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

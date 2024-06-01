import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfAddComponent } from './add.component';

describe('ConfAddComponent', () => {
  let component: ConfAddComponent;
  let fixture: ComponentFixture<ConfAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

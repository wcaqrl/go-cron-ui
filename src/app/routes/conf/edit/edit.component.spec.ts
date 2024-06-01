import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfEditComponent } from './edit.component';
import { ConfListComponent } from '../list/list.component';

describe('ConfEditComponent', () => {
  let component: ConfEditComponent;
  let fixture: ComponentFixture<ConfEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

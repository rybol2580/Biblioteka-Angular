import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestWalidacjiComponent } from './test-walidacji.component';

describe('TestWalidacjiComponent', () => {
  let component: TestWalidacjiComponent;
  let fixture: ComponentFixture<TestWalidacjiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestWalidacjiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestWalidacjiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

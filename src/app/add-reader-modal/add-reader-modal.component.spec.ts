import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddReaderModalComponent } from './add-reader-modal.component';

describe('AddReaderModalComponent', () => {
  let component: AddReaderModalComponent;
  let fixture: ComponentFixture<AddReaderModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddReaderModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddReaderModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

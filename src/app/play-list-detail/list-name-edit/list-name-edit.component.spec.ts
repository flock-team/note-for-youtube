import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListNameEditComponent } from './list-name-edit.component';

describe('ListNameEditComponent', () => {
  let component: ListNameEditComponent;
  let fixture: ComponentFixture<ListNameEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ListNameEditComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListNameEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

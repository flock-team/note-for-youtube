import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTextEditComponent } from './list-description-edit.component';

describe('ListTextEditComponent', () => {
  let component: ListTextEditComponent;
  let fixture: ComponentFixture<ListTextEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ListTextEditComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTextEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

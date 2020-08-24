import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPrivacyEditComponent } from './list-privacy-edit.component';

describe('ListPrivacyEditComponent', () => {
  let component: ListPrivacyEditComponent;
  let fixture: ComponentFixture<ListPrivacyEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ListPrivacyEditComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPrivacyEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

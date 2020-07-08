import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniVariantComponent } from './mini-variant.component';

describe('MiniVariantComponent', () => {
  let component: MiniVariantComponent;
  let fixture: ComponentFixture<MiniVariantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MiniVariantComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiniVariantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

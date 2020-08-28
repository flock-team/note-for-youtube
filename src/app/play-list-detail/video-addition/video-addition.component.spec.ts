import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoAdditionComponent } from './video-addition.component';

describe('VideoAdditionComponent', () => {
  let component: VideoAdditionComponent;
  let fixture: ComponentFixture<VideoAdditionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VideoAdditionComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoAdditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

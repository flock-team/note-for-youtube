import { Component, Input, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Video } from 'src/app/interfaces/video';
import { AuthService } from 'src/app/services/auth.service';
import { VideoService } from 'src/app/services/video.service';

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.scss'],
})
export class VideoListComponent implements OnInit {
  @Input() videos$: Observable<Video[]>;
  @Input() listId: string;
  uid = this.authService.uid;

  constructor(
    private authService: AuthService,
    public videoService: VideoService
  ) {}

  ngOnInit(): void {}
}

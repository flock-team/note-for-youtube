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
  videos: Video[];
  uid = this.authService.uid;

  private subscriptions: Subscription = new Subscription();

  constructor(
    private authService: AuthService,
    public videoService: VideoService
  ) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.videos$.subscribe((videos) => {
        this.videos = videos;
      })
    );
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { tick } from '@angular/core/testing';
import { PlayList } from 'functions/src/intarfaces/play-list';
import { Observable, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Video } from 'src/app/interfaces/video';
import { AuthService } from 'src/app/services/auth.service';
import { PlayListService } from 'src/app/services/play-list.service';
import { VideoService } from 'src/app/services/video.service';

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.scss'],
})
export class VideoListComponent implements OnInit {
  @Input() videos$: Observable<Video[]>;
  @Input() listId: string;
  private subscriptions: Subscription = new Subscription();
  uid = this.authService.uid;
  videos: Video[];
  constructor(
    private authService: AuthService,
    public videoService: VideoService,
    private playlistService: PlayListService
  ) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.videos$.subscribe((videos) => {
        this.videos = videos;
      })
    );
  }

  delete(videoId: string) {
    this.videoService.deleteVideo(this.uid, this.listId, videoId);
    this.subscriptions.add(
      this.videoService.getVideos(this.uid, this.listId).subscribe((video) => {
        const url: Omit<
          PlayList,
          | 'listName'
          | 'id'
          | 'creatorId'
          | 'description'
          | 'privacy'
          | 'createdAt'
          | 'updateAt'
        > = {
          thumbnailURL: video[0].thumbnailURL,
        };
        this.playlistService.updatePlayList(this.uid, this.listId, url);
      })
    );
  }
}

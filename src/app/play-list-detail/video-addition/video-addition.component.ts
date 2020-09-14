import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Video } from 'src/app/interfaces/video';
import { AuthService } from 'src/app/services/auth.service';
import { VideoService } from 'src/app/services/video.service';

@Component({
  selector: 'app-video-addition',
  templateUrl: './video-addition.component.html',
  styleUrls: ['./video-addition.component.scss'],
})
export class VideoAdditionComponent implements OnInit, OnDestroy {
  @Input() videos$: Observable<Video[]>;
  private uid = this.authService.uid;
  private listId = this.route.snapshot.paramMap.get('id');
  private subscriptions: Subscription = new Subscription();

  urlIdControl: FormControl = new FormControl('');
  isMovieEditable: boolean;
  videos: Video[];
  maxVideoLimit = 50;

  constructor(
    private videoService: VideoService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.videos$.subscribe((videos) => {
        this.videos = videos;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  clearForm() {
    this.urlIdControl.setValue('');
  }

  async addVideo() {
    const videoId = this.urlIdControl.value.match(
      /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/
    );
    const playlistId = this.urlIdControl.value.match(/[playlist?]list=([^&]+)/);

    if (!videoId && !playlistId) {
      this.snackBar.open(
        'URLが正しくありません。もう一度確認してからお試しください。'
      );
      return;
    }

    if (videoId) {
      await this.createVideo(videoId[1]);
    } else if (playlistId) {
      await this.createPlyalistVideos(playlistId[1]);
    }
  }

  private async createVideo(videoId: string) {
    const videoItem: any = await this.videoService.getVideoItem(videoId);
    const targetVideo = this.videos.find((video) => video.videoId === videoId);

    if (targetVideo) {
      this.snackBar.open('指定されたURLの動画は既に追加されています。');
      return;
    }

    await this.createAction({
      video: videoItem.items[0],
      videoId,
    });
    this.snackBar.open('動画が追加されました！');
  }

  private async createPlyalistVideos(playlistId: string) {
    const playlists: any = await this.videoService.getPlaylistItems(playlistId);
    const videoItems = playlists.items.filter((item) => {
      return !this.videos.find(
        (video) => video.videoId === item.snippet.resourceId.videoId
      );
    });
    const filteringVideoId = playlists.items.filter((item) => {
      return this.videos.find(
        (video) => video.videoId === item.snippet.resourceId.videoId
      );
    });
    const createVideo = videoItems.map(
      async (video) =>
        await this.createAction({
          video,
        })
    );

    if (videoItems.length === 0) {
      this.snackBar.open(
        '指定されたプレイリストには、追加できる動画がありませんでした。'
      );
      return;
    }

    if (filteringVideoId.length === 0) {
      Promise.all(createVideo);
      this.snackBar.open('動画が追加されました！');
      return;
    } else {
      Promise.all(createVideo);
      this.snackBar.open(
        '重複する動画がありましたので、一部の動画を追加しました！'
      );
    }
  }

  private createAction(params: {
    video: any;
    videoId?: string;
  }): Promise<void> {
    const videoContens: Omit<Video, 'createdAt' | 'updatedAt'> = {
      videoId: params.videoId || params.video.snippet.resourceId.videoId,
      title: params.video.snippet.title,
      thumbnailURL: params.video.snippet.thumbnails.medium.url,
    };
    return this.videoService.createVideo(this.uid, this.listId, videoContens);
  }
}

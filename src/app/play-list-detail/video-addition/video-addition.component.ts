import { Component, OnInit, OnDestroy } from '@angular/core';
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
  private uid = this.authService.uid;
  private listId = this.route.snapshot.paramMap.get('id');
  private videos$: Observable<Video[]> = this.videoService.getVideos(
    this.uid,
    this.listId
  );
  private videos: Video[];
  private subscriptions: Subscription = new Subscription();

  urlIdControl: FormControl = new FormControl('');
  isMovieEditable: boolean;

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

    if (this.videos.length >= 50) {
      this.snackBar.open(
        '動画を追加出来ませんでした。マイリストに追加出来る動画は最大50件までです。'
      );
      return;
    }

    if (targetVideo) {
      this.snackBar.open('指定されたURLの動画は既に追加されています。');
      return;
    } else {
      await this.createAction({
        video: videoItem.items[0],
        videoId,
      });
    }
    this.snackBar.open('動画が追加されました！');
  }

  private async createPlyalistVideos(playlistId: string) {
    const playlists: any = await this.videoService.getPlaylistItems(playlistId);
    const videoItems = playlists.items.filter((item) => {
      return !this.videos.find(
        (video) => video.videoId === item.snippet.resourceId.videoId
      );
    });
    const createVideo = videoItems.map(
      async (video) =>
        await this.createAction({
          video,
        })
    );
    const maxVideo = 50;

    if (videoItems.length === 0) {
      this.snackBar.open(
        '指定されたURLのプレイリストには既に追加されているか、追加できる動画がありませんでした。'
      );
      return;
    } else if (this.videos.length <= maxVideo) {
      this.snackBar.open(
        '動画は50件以上追加出来ません。マイリストの動画を削除するか、動画数が50件以内の追加したいプレイリストのURLを入力してください。'
      );
      return;
    }

    if (videoItems.length <= 1 && videoItems.length >= maxVideo) {
      Promise.all(createVideo);
      this.snackBar.open(
        '指定されたURLのプレイリストには既に追加されている動画がありましたので、一部の動画のみ追加しました！'
      );
    } else if (videoItems.length === maxVideo) {
      Promise.all(createVideo);
      this.snackBar.open('動画が追加されました！');
    }
  }

  private createAction(params: {
    video: any;
    videoId?: string;
  }): Promise<void> {
    const videoContens: Video = {
      videoId: params.videoId || params.video.snippet.resourceId.videoId,
      title: params.video.snippet.title,
      thumbnailURL: params.video.snippet.thumbnails.medium.url,
    };
    return this.videoService.createVideo(this.uid, this.listId, videoContens);
  }
}

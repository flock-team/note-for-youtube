import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlayList } from 'functions/src/intarfaces/play-list';
import { Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { Video } from 'src/app/interfaces/video';
import { AuthService } from 'src/app/services/auth.service';
import { PlayListService } from 'src/app/services/play-list.service';
import { VideoService } from 'src/app/services/video.service';

@Component({
  selector: 'app-play-list-detail',
  templateUrl: './play-list-detail.component.html',
  styleUrls: ['./play-list-detail.component.scss'],
})
export class PlayListDetailComponent implements OnInit {
  private listId$: Observable<string> = this.route.paramMap.pipe(
    map((paramMap) => paramMap.get('id'))
  );

  loading: boolean;
  uid = this.authService.uid;
  listId = this.route.snapshot.paramMap.get('id');
  playList$: Observable<PlayList> = this.listId$
    .pipe(
      switchMap((listId) =>
        this.playListService.getMyPlayList(this.uid, listId)
      )
    )
    .pipe(tap(() => (this.loading = false)));
  videos$: Observable<Video[]> = this.videoService.getVideos(
    this.uid,
    this.listId
  );

  constructor(
    private route: ActivatedRoute,
    private playListService: PlayListService,
    private authService: AuthService,
    private videoService: VideoService
  ) {
    this.loading = true;
  }

  ngOnInit(): void {}
}

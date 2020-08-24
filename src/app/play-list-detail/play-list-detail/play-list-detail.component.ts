import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlayListService } from 'src/app/services/play-list.service';
import { Observable } from 'rxjs';
import { PlayList } from 'functions/src/intarfaces/play-list';
import { switchMap, map } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-play-list-detail',
  templateUrl: './play-list-detail.component.html',
  styleUrls: ['./play-list-detail.component.scss'],
})
export class PlayListDetailComponent implements OnInit {
  private uid = this.authService.uid;
  private listId$: Observable<string> = this.route.paramMap.pipe(
    map((paramMap) => paramMap.get('id'))
  );

  playList$: Observable<PlayList> = this.listId$.pipe(
    switchMap((listId) => this.playListService.getMyPlayList(this.uid, listId))
  );

  constructor(
    private route: ActivatedRoute,
    private playListService: PlayListService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}
}

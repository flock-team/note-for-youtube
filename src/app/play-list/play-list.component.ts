import { Component, OnInit } from '@angular/core';
import { PlayList } from 'functions/src/intarfaces/play-list';
import { Observable } from 'rxjs';
import { PlayListService } from '../services/play-list.service';
import { AuthService } from '../services/auth.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-play-list',
  templateUrl: './play-list.component.html',
  styleUrls: ['./play-list.component.scss'],
})
export class PlayListComponent implements OnInit {
  user$ = this.authService.user$;
  playLists$: Observable<PlayList[]> = this.user$.pipe(
    switchMap((user) => this.playListService.getPlayLists(user.uid))
  );

  constructor(
    private playListService: PlayListService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}
}

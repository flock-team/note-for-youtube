import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlayListService } from 'src/app/services/play-list.service';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { PlayList } from 'functions/src/intarfaces/play-list';
import { switchMap, map } from 'rxjs/operators';

@Component({
  selector: 'app-list-text-edit',
  templateUrl: './list-text-edit.component.html',
  styleUrls: ['./list-text-edit.component.scss'],
})
export class ListTextEditComponent implements OnInit {
  private uid = this.authService.uid;
  private listId$: Observable<string> = this.route.paramMap.pipe(
    map((paramMap) => paramMap.get('id'))
  );

  isTextEditable: boolean;
  playList$: Observable<PlayList> = this.listId$.pipe(
    switchMap((listId) => this.playListService.getMyPlayList(this.uid, listId))
  );
  form = this.fb.group({
    listText: ['aaa', [Validators.maxLength(5000)]],
  });
  get listText(): FormControl {
    return this.form.get('listText') as FormControl;
  }
  constructor(
    private route: ActivatedRoute,
    private playListService: PlayListService,
    private authService: AuthService,
    private fb: FormBuilder
  ) {
    this.playList$.subscribe((playList) => {
      this.form.patchValue(playList);
    });
  }

  ngOnInit(): void {}
}

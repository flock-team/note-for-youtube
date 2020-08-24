import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormControl } from '@angular/forms';
import { PlayList } from 'functions/src/intarfaces/play-list';
import { PlayListService } from 'src/app/services/play-list.service';
import { Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-list-name-edit',
  templateUrl: './list-name-edit.component.html',
  styleUrls: ['./list-name-edit.component.scss'],
})
export class ListNameEditComponent implements OnInit {
  private uid = this.authService.uid;
  private listId$: Observable<string> = this.route.paramMap.pipe(
    map((paramMap) => paramMap.get('id'))
  );

  isTitleEditable: boolean;
  playList$: Observable<PlayList> = this.listId$.pipe(
    switchMap((listId) => this.playListService.getMyPlayList(this.uid, listId))
  );
  form = this.fb.group({
    listName: ['', [Validators.required, Validators.maxLength(150)]],
  });

  get listName(): FormControl {
    return this.form.get('listName') as FormControl;
  }

  constructor(
    private fb: FormBuilder,
    private playListService: PlayListService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private db: AngularFirestore
  ) {
    this.playList$.subscribe((playList) => {
      this.form.patchValue(playList);
    });
  }

  ngOnInit(): void {}
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PlayListService } from 'src/app/services/play-list.service';
import { Observable } from 'rxjs';
import { PlayList } from 'functions/src/intarfaces/play-list';
import { switchMap, map } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-list-privacy-edit',
  templateUrl: './list-privacy-edit.component.html',
  styleUrls: ['./list-privacy-edit.component.scss'],
})
export class ListPrivacyEditComponent implements OnInit {
  private uid = this.authService.uid;
  private listId: string;
  private listId$: Observable<string> = this.route.paramMap.pipe(
    map((paramMap) => paramMap.get('id'))
  );

  isMovieEditable: boolean;
  playList$: Observable<PlayList> = this.listId$.pipe(
    switchMap((listId) => this.playListService.getMyPlayList(this.uid, listId))
  );
  form = this.fb.group({
    privacy: [
      '',
      [Validators.required, Validators.pattern(/public|limited|private/)],
    ],
  });
  get privacy(): FormControl {
    return this.form.get('privacy') as FormControl;
  }

  constructor(
    private route: ActivatedRoute,
    private playListService: PlayListService,
    private authService: AuthService,
    private fb: FormBuilder
  ) {
    this.getListId();
  }

  ngOnInit(): void {
    this.setValue();
  }

  private getListId() {
    this.listId$.subscribe((id) => {
      this.listId = id;
    });
  }

  private setValue() {
    this.playList$.subscribe((playList) => {
      this.form.patchValue(playList);
    });
  }

  updatePrivacy() {
    const formData = this.form.value;
    const newValue = {
      privacy: formData.privacy,
    };
    this.playListService.updatePlayList(this.uid, this.listId, newValue);
  }
}

import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PlayList } from 'functions/src/intarfaces/play-list';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { PlayListService } from 'src/app/services/play-list.service';

@Component({
  selector: 'app-list-name-edit',
  templateUrl: './list-name-edit.component.html',
  styleUrls: ['./list-name-edit.component.scss'],
})
export class ListNameEditComponent implements OnInit {
  private uid = this.authService.uid;
  private listId: string;
  private listId$: Observable<string> = this.route.paramMap.pipe(
    map((paramMap) => paramMap.get('id'))
  );

  isTitleEditable: boolean;
  playList$: Observable<PlayList> = this.listId$.pipe(
    switchMap((id) => this.playListService.getMyPlayList(this.uid, id))
  );
  form = this.fb.group({
    listName: ['', [Validators.required, Validators.maxLength(150)]],
  });
  get listName(): FormControl {
    return this.form.get('listName') as FormControl;
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

  setValue() {
    this.playList$.subscribe((playList) => {
      this.form.patchValue(playList);
    });
    this.form.markAsPristine();
  }

  updateListName() {
    const formData = this.form.value;
    const newValue = {
      listName: formData.listName,
    };
    this.playListService
      .updatePlayList(this.uid, this.listId, newValue)
      .then(() => {
        this.form.markAsPristine();
      });
    this.isTitleEditable = false;
  }
}

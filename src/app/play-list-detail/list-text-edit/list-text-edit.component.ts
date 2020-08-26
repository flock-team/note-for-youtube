import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PlayList } from 'functions/src/intarfaces/play-list';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { PlayListService } from 'src/app/services/play-list.service';

@Component({
  selector: 'app-list-text-edit',
  templateUrl: './list-text-edit.component.html',
  styleUrls: ['./list-text-edit.component.scss'],
})
export class ListTextEditComponent implements OnInit {
  private uid = this.authService.uid;
  private listId: string;
  private listId$: Observable<string> = this.route.paramMap.pipe(
    map((paramMap) => paramMap.get('id'))
  );

  isTextEditable: boolean;
  playList$: Observable<PlayList> = this.listId$.pipe(
    switchMap((listId) => this.playListService.getMyPlayList(this.uid, listId))
  );
  form = this.fb.group({
    listText: ['', [Validators.maxLength(5000)]],
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

  updateListText() {
    const formData = this.form.value;
    const newValue = {
      listText: formData.listText,
    };
    this.playListService
      .updatePlayList(this.uid, this.listId, newValue)
      .then(() => {
        this.form.markAsPristine();
      });
    this.isTextEditable = false;
  }
}

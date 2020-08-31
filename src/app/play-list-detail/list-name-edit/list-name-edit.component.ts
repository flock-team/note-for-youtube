import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PlayList } from 'functions/src/intarfaces/play-list';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { PlayListService } from 'src/app/services/play-list.service';

@Component({
  selector: 'app-list-name-edit',
  templateUrl: './list-name-edit.component.html',
  styleUrls: ['./list-name-edit.component.scss'],
})
export class ListNameEditComponent implements OnInit {
  @Input() playList$: Observable<PlayList>;

  private uid = this.authService.uid;

  isTitleEditable: boolean;
  listNameMaxlength = 150;
  form = this.fb.group({
    listName: [
      '',
      [Validators.required, Validators.maxLength(this.listNameMaxlength)],
    ],
  });
  get listName(): FormControl {
    return this.form.get('listName') as FormControl;
  }

  constructor(
    private route: ActivatedRoute,
    private playListService: PlayListService,
    private authService: AuthService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.setValue();
  }

  setValue() {
    this.playList$.subscribe((playList) => {
      this.form.patchValue(playList);
    });
    this.form.markAsPristine();
  }

  updateListName() {
    const formData = this.form.value;
    const listId = this.route.snapshot.paramMap.get('id');
    const newValue = {
      listName: formData.listName,
    };
    this.playListService.updatePlayList(this.uid, listId, newValue).then(() => {
      this.form.markAsPristine();
    });
    this.isTitleEditable = false;
  }
}

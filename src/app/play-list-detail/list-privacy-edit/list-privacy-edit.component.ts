import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PlayList } from 'functions/src/intarfaces/play-list';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { PlayListService } from 'src/app/services/play-list.service';

@Component({
  selector: 'app-list-privacy-edit',
  templateUrl: './list-privacy-edit.component.html',
  styleUrls: ['./list-privacy-edit.component.scss'],
})
export class ListPrivacyEditComponent implements OnInit {
  @Input() playList$: Observable<PlayList>;

  private uid = this.authService.uid;

  isMovieEditable: boolean;
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
  ) {}

  ngOnInit(): void {
    this.setValue();
  }

  private setValue() {
    this.playList$.subscribe((playList) => {
      this.form.patchValue(playList);
    });
  }

  updatePrivacy() {
    const formData = this.form.value;
    const listId = this.route.snapshot.paramMap.get('id');
    const newValue = {
      privacy: formData.privacy,
    };
    this.playListService.updatePlayList(this.uid, listId, newValue);
  }
}

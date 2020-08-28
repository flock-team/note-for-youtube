import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PlayList } from 'functions/src/intarfaces/play-list';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { PlayListService } from 'src/app/services/play-list.service';

@Component({
  selector: 'app-list-description-edit',
  templateUrl: './list-description-edit.component.html',
  styleUrls: ['./list-description-edit.component.scss'],
})
export class ListTextEditComponent implements OnInit {
  @Input() playList$: Observable<PlayList>;

  private uid = this.authService.uid;

  isEditable: boolean;
  DescriptionMaxlength = 200;
  form = this.fb.group({
    description: ['', [Validators.maxLength(this.DescriptionMaxlength)]],
  });
  get description(): FormControl {
    return this.form.get('description') as FormControl;
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

  updateDescription() {
    const formData = this.form.value;
    const listId = this.route.snapshot.paramMap.get('id');
    const newValue = {
      description: formData.description,
    };
    this.playListService.updatePlayList(this.uid, listId, newValue).then(() => {
      this.form.markAsPristine();
    });
    this.isEditable = false;
  }
}

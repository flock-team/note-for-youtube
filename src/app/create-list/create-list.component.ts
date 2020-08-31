import { Component, OnInit } from '@angular/core';
import { PlayListService } from '../services/play-list.service';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { PlayList } from 'functions/src/intarfaces/play-list';
import { AuthService } from '../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-list',
  templateUrl: './create-list.component.html',
  styleUrls: ['./create-list.component.scss'],
})
export class CreateListComponent implements OnInit {
  value = '';
  form = this.fb.group({
    listName: ['', [Validators.required, Validators.maxLength(150)]],
    privacy: [
      'public',
      [Validators.required, Validators.pattern(/public|limited|private/)],
    ],
  });

  get listName() {
    return this.form.get('listName') as FormControl;
  }
  constructor(
    private playListService: PlayListService,
    private dialog: MatDialogRef<CreateListComponent>,
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  createPlayList(): Promise<void> {
    const formData = this.form.value;
    const newValue: Omit<PlayList, 'id' | 'createdAt' | 'updateAt'> = {
      listName: formData.listName,
      privacy: formData.privacy,
      creatorId: this.authService.uid,
      description: '',
    };
    return this.playListService.createPlayList(newValue).then(() => {
      this.dialog.close();
      this.snackBar.open('マイリストを作成しました😎', null, {
        duration: 2000,
      });
    });
  }
}

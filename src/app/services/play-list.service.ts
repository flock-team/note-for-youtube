import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { PlayList } from 'functions/src/intarfaces/play-list';
import { firestore } from 'firebase';

@Injectable({
  providedIn: 'root',
})
export class PlayListService {
  constructor(private db: AngularFirestore, private authService: AuthService) {}

  createPlayList(
    playList: Omit<PlayList, 'id' | 'createdAt' | 'updateAt'>
  ): Promise<void> {
    const id = this.db.createId();
    const value: PlayList = {
      ...playList,
      id,
      createdAt: firestore.Timestamp.now(),
      updateAt: firestore.Timestamp.now(),
    };
    return this.db
      .doc<PlayList>(`users/${playList.creatorId}/playList/${id}`)
      .set(value);
  }
}

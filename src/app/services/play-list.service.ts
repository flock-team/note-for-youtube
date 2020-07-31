import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { PlayList } from 'functions/src/intarfaces/play-list';
import { firestore } from 'firebase';
import { Observable } from 'rxjs';

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
      .doc<PlayList>(`users/${this.authService.uid}/playLists/${id}`)
      .set(value);
  }

  getPlayLists(uid: string): Observable<PlayList[]> {
    return this.db
      .collection<PlayList>(`users/${uid}/playLists`)
      .valueChanges();
  }
}

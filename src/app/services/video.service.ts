import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Video } from '../interfaces/video';
import { firestore } from 'firebase';

@Injectable({
  providedIn: 'root',
})
export class VideoService {
  apiKey = 'AIzaSyAF68vjlrasVO1_qbwg4vfnE-0P44hxauY';
  constructor(private db: AngularFirestore, private http: HttpClient) {}

  getVideoItem(id: string): Promise<object> {
    return this.http
      .get('https://www.googleapis.com/youtube/v3/videos', {
        params: new HttpParams({
          fromObject: {
            part: 'snippet',
            key: this.apiKey,
            id,
          },
        }),
      })
      .pipe(take(1))
      .toPromise();
  }

  getPlaylistItems(playlistId: string): Promise<object> {
    return this.http
      .get('https://www.googleapis.com/youtube/v3/playlistItems', {
        params: new HttpParams({
          fromObject: {
            part: 'snippet',
            key: this.apiKey,
            playlistId,
            maxResults: '50',
          },
        }),
      })
      .pipe(take(1))
      .toPromise();
  }

  getVideos(uid: string, listId: string): Observable<Video[]> {
    return this.db
      .collection<Video>(`users/${uid}/playLists/${listId}/videos`)
      .valueChanges();
  }

  createVideo(
    uid: string,
    listId: string,
    video: Omit<Video, 'createdAt' | 'updatedAt'>
  ): Promise<void> {
    const value: Video = {
      ...video,
      createdAt: firestore.Timestamp.now(),
      updatedAt: firestore.Timestamp.now(),
    };
    return this.db
      .doc<Video>(`users/${uid}/playLists/${listId}/videos/${video.videoId}`)
      .set(value);
  }
}

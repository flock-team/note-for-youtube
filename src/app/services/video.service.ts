import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Video } from '../interfaces/video';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class VideoService {
  apiKey = 'AIzaSyAF68vjlrasVO1_qbwg4vfnE-0P44hxauY';
  videoItems;
  constructor(private db: AngularFirestore, private http: HttpClient) {}

  getYoutubeVideo(id: string): Promise<object> {
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

  createVideoUrlId(uid: string, listId: string, video: Video): Promise<void> {
    return this.db
      .doc<Video>(`users/${uid}/playLists/${listId}/videos/${video.videoId}`)
      .set(video);
  }
}

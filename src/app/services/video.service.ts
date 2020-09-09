import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Video } from '../interfaces/video';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VideoService {
  apiKey = 'AIzaSyAF68vjlrasVO1_qbwg4vfnE-0P44hxauY';
  videoItems;
  constructor(private db: AngularFirestore, private http: HttpClient) {}

  getYoutubeVideo(id: string) {
    this.http
      .get('https://www.googleapis.com/youtube/v3/videos', {
        params: new HttpParams({
          fromObject: {
            part: 'snippet',
            key: this.apiKey,
            id,
          },
        }),
      })
      .subscribe((res: any) => {
        this.videoItems = res.items[0].snippet;
        console.log(this.videoItems);
      });
  }

  createVideoUrlId(
    uid: string,
    listId: string,
    video: Omit<Video, 'description' | 'seekTime'>
  ): Promise<void> {
    const value: Video = {
      ...video,
      description: '',
      seekTime: '',
    };
    return this.db
      .doc<Video>(`users/${uid}/playlist/${listId}/videos`)
      .set(value);
  }
}

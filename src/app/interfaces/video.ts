import { firestore } from 'firebase';

export interface Video {
  creatorId: string;
  videoId: string;
  title: string;
  thumbnailURL?: string;
  description?: string;
  seekTime?: string;
  createdAt: firestore.Timestamp;
  updatedAt: firestore.Timestamp;
}

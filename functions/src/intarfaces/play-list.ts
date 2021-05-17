import { firestore } from 'firebase-admin';

export interface PlayList {
  id: string;
  creatorId: string;
  listName: string;
  description?: string;
  thumbnailURL?: string;
  privacy: string;
  createdAt: firestore.Timestamp;
  updateAt: firestore.Timestamp;
}

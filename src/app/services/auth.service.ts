import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { auth, User } from 'firebase/app';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserData } from 'functions/src/intarfaces/user';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<UserData> = this.afAuth.authState.pipe(
    switchMap((afUser) => {
      if (afUser) {
        return this.db.doc<UserData>(`users/${afUser.uid}`).valueChanges();
      } else {
        return of(null);
      }
    })
  );

  constructor(
    public afAuth: AngularFireAuth,
    private db: AngularFirestore,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  googleLogin() {
    const googleProvider = new auth.GoogleAuthProvider();
    googleProvider.setCustomParameters({ prompt: 'select_account' });
    this.afAuth.signInWithPopup(googleProvider).then(() => {
      this.snackBar.open('ログインしました', null, {
        duration: 2000,
      });
      this.router.navigateByUrl('/');
    });
  }

  twitterLogin() {
    const twitterProvider = new auth.TwitterAuthProvider();
    twitterProvider.setCustomParameters({ prompt: 'select_account' });
    this.afAuth.signInWithPopup(twitterProvider).then(() => {
      this.snackBar.open('ログインしました', null, {
        duration: 2000,
      });
      this.router.navigateByUrl('/');
    });
  }

  logout() {
    this.afAuth.signOut().then(() => {
      this.snackBar.open('ログアウトしました', null, {
        duration: 2000,
      });
      this.router.navigateByUrl('/welcome');
    });
  }
}

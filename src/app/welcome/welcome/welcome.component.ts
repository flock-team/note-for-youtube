import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit {
  googleLogging: boolean;
  twitterLogging: boolean;
  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  googleLogin() {
    this.googleLogging = true;
    this.authService.googleLogin().finally(() => {
      this.googleLogging = false;
    });
  }

  twitterLogin() {
    this.twitterLogging = true;
    this.authService.twitterLogin().finally(() => {
      this.twitterLogging = false;
    });
  }
}

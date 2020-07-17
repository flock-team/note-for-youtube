import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Observable } from 'rxjs';
import { UserData } from 'functions/src/intarfaces/user';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  user$: Observable<UserData> = this.authService.user$;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}
}

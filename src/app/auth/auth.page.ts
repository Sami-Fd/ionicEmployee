import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../_models/user';
import { AuthService } from '../_services/auth/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  user: User = new User();
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }
  login() {
    this.authService.login(this.user).subscribe(result => {
      if (result[0].username == this.user.username && result[0].password == this.user.password) {
        window.localStorage.setItem("user", JSON.stringify(result[0]));
        this.router.navigate(['/employee']);
      } else {
        console.log("error")
      }
    })
  }


}

import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  isLoading: boolean = false;
  isLogin: boolean = true;

  constructor(
    public authService: AuthService,
    private router: Router,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {}

  onLogin() {
    this.isLoading = true;
    this.loadingCtrl
      .create({
        message: 'Logging in...',
        keyboardClose: true,
      })
      .then((loadingEl) => {
        loadingEl.present();
        setTimeout(() => {
          this.isLoading = false;

          this.router.navigateByUrl('/places');
          loadingEl.dismiss();
        }, 1500);
      });
    this.authService.login();
  }

  onSubmit(form: any) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    this.onLogin();
    console.log(email, password);
  }

  onSwitchAuthMode() {
    //toggle this.isLogin
    this.isLogin = !this.isLogin;
    console.log(this.isLogin);
  }
}

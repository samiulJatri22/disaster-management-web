import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService, JwtUtilsService } from '../../common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [ReactiveFormsModule, RouterModule],
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;

  private snackBar = inject(MatSnackBar);

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private readonly jwtService: JwtUtilsService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    this.loginForm.disable();

    this.authService.signIn(this.loginForm.value).subscribe(
      (res: { accessToken: string; refreshToken: string }) => {
        this.jwtService.setAccessToken(res.accessToken);
        this.snackBar.open('Successfully login.', '', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 1000,
        });

        const tokenData = this.jwtService.decodeToken(res.accessToken);
        this.jwtService.setProfileInfo(tokenData._doc);

        this.router.navigate(['/system/dashboard']);
      },
      (e: any) => {
        this.snackBar.open(e.error.message, '', {
          horizontalPosition: 'center',
          verticalPosition: 'top',
          duration: 1000,
        });
        this.loginForm.enable();
        this.loginForm.reset();
      }
    );
  }
}

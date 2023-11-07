import { StmtModifier } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import ActivateGuard from 'src/app/activate-guard';
import { AuthServiceService } from 'src/app/service/auth-service.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  loginForm!: FormGroup;
  submitted = false;
  loginError: boolean = false;
  errorMessage:string='';

  constructor(private fb: FormBuilder,
    private router: Router,
    private authService: AuthServiceService,
    private guard: ActivateGuard) { }
 

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ["", [Validators.email, Validators.required]],
      password: ["", Validators.required]
    })
    this.authService.messageSubject$.subscribe(message => {
      if (message) {
        this.loginError = true;
        this.errorMessage=message;
      }
    });
  }


  onLogin() {
    this.submitted = true
    if (this.loginForm.valid) {
      // this.authService.getUsers().subscribe(data => {
      //   const user = data.find(item => item.email === this.loginForm.value.email && item.password === this.loginForm.value.password);
      //   if (user) {
      //     user.login = true;
      //     const userData = {
      //       id: user.id,
      //       email: user.email,
      //       name: user.name,
      //       score: user.score,
      //       login: user.login
      //     }
      //    
      //     this.authService.putUserLogin(user.id, userData).subscribe(response => {
      //       this.guard.setCanActivate(true);
      //       this.authService.setLoginUserData(userData);
      //       this.router.navigate(['/user', user.id]);
      //     }, error => {
      //       console.error('Error updating user login status:', error);
      //     });
      //   }
      //   else {
      //     this.loginError = true;
      //   }
      // })

      this.authService.userLogin(this.loginForm.value.email, this.loginForm.value.password)

    }
  }
}


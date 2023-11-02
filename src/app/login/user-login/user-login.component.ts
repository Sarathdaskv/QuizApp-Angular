import { StmtModifier } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthServiceService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ["", [Validators.email, Validators.required]],
      password: ["", Validators.required]
    })
  }


  onLogin() {
    this.submitted = true
    if (this.loginForm.valid) {
      this.authService.getUsers().subscribe(data => {
        const user = data.find(item => item.email === this.loginForm.value.email && item.password === this.loginForm.value.password);
        if (user) {
          localStorage.setItem("user-Data", JSON.stringify(this.loginForm.value));
          this.router.navigate(['/user',user.id]);
        }
        else {
          this.loginError = true;
        }
      })

    }
  }
}


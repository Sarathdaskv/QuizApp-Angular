import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/service/auth-service.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {
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
      this.authService.getAdmin().subscribe(data => {
        const user = data.find(item => item.email === this.loginForm.value.email && item.password === this.loginForm.value.password);
        if (user) {
          localStorage.setItem("admin-Data", JSON.stringify(this.loginForm.value));
          this.router.navigate(["/user"]);
        }
        else {
          this.loginError = true;
        }
      })

    }
  }
}

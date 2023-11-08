import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/service/admin.service';
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
  errorMessage:string='';
  
  constructor(private fb: FormBuilder, private router: Router, private adminService: AdminService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ["", [Validators.email, Validators.required]],
      password: ["", Validators.required]
    })
    this.adminService.messageSubject$.subscribe(message => {
      if (message) {
        this.loginError = true;
        this.errorMessage=message;
      }
    });
  }


  onLogin() {
    this.submitted = true
    if (this.loginForm.valid) {
      this.adminService.adminLogin(this.loginForm.value.email, this.loginForm.value.password)
    }
  }
}

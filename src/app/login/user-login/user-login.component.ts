import { StmtModifier } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {
  public loginForm!: FormGroup;
  public submitted = false;

  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ["", [Validators.email, Validators.required]],
      password: ["", Validators.required]
    })
  }


  onLogin() {
    this.submitted = true
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
    //  localStorage.setItem("user-Data", JSON.stringify(this.loginForm.value));
      this.router.navigate(["/user"]);
    }
  }
}


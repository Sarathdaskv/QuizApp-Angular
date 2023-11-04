import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AuthServiceService } from '../service/auth-service.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  userId!: string;
  userData!: any



  constructor(private route: ActivatedRoute, private auth: AuthServiceService, private routing: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(data => {
      console.log(data);
      this.userId = data['userId'];
    })
     this.auth.getLoginUserData(this.userId).subscribe(data=>{
      this.userData=data;
    }
    )
    
    console.log("reg",this.userData);
    
  }

  logOut() {
    this.userData.login = false;
    this.routing.navigate(['/'])
  }

}

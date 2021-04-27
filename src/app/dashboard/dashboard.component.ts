import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  userprofile;

  constructor(
    private auth : AuthenticationService,
    private router : Router
  ) {
    this.userprofile = this.auth.getProfile();
   }

  ngOnInit(): void {
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/signup']);
  }


}

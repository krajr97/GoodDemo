import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit, OnDestroy {

  userAuth : Subscription;

  constructor(
    private formbuilder: FormBuilder,
    private auth : AuthenticationService,
    private router : Router
    ) {
      this.userAuth = this.auth.authListener().subscribe((data:any)=> {
        console.log(data);
        if(data) {
          this.router.navigate(['/dashboard']);
        }
      })
    }

  SignUpForm: FormGroup;
  Devices: string[] = [];

  ngOnInit(): void {
    this.SignUpForm = this.formbuilder.group({
      fullName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      profileImg: [''],
    });
  }

  onSubmit() {
    const obj = {
      fullName: this.SignUpForm.value.fullName,
      email: this.SignUpForm.value.email,
      username: this.SignUpForm.value.username,
      password: this.SignUpForm.value.password,
      profileImg: this.SignUpForm.value.profileImg,
      devices: this.Devices
    };

    console.log(obj);
    this.auth.UserSignUp(obj).subscribe((response : any) => {
      console.log(response);
      if(response.message == 'Success') {
         this.auth.setToken(response.result.token);
         this.auth.setProfile(response.result);
         this.router.navigate(['/dashboard']);
      } else {
        window.alert('Something went wrong!');
      }
    });
  }

  checkEmail() {
    console.log(this.SignUpForm.get('email'));
  }

  ngOnDestroy() {
    this.userAuth.unsubscribe();
  }

}

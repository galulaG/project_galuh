import { Component, OnInit, ViewEncapsulation, AfterViewChecked  } from '@angular/core';
import { Http, Headers, RequestOptions } from "@angular/http";
import { NgForm }from '@angular/forms';
import { Router }from '@angular/router';
import { ActivatedRoute } from '@angular/router'


//import login.service
// import { AuthorizationService}from '../authorization.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']

})

export class LoginComponent implements OnInit {


 
  constructor(private http: Http, private router : Router, private actroute : ActivatedRoute) {}
  
  ngOnInit() {
    
    sessionStorage.removeItem("token")

  }

  // onSubmit(fo:NgForm){
  //   console.log(fo.value);
  //   this.router.navigate(['/'])
  


  Register( f : NgForm ) {

    alert('You have to login')
    
    let obj = {
    username : f.value.username,
    email : f.value.email,
    phoneNumber : f.value.phoneNumber,
    password : f.value.password
    }

    console.log(f.value)

    let header = new Headers({ "Content-Type" : "application/json" });
    let options = new RequestOptions({ headers : header });

    this.http.post("http://localhost:3000/api/user/register", obj, options)
    .subscribe(
      result => {
        console.log(result.json());
        this.router.navigate(['/']); //utk redirect
      },
      error => {
        console.log("Error!")
      }
    );
    
  }




  Login( f : NgForm ){


    let obj = {
      email: f.value.email,
      password: f.value.password
    };
    console.log(obj)

    
    let header = new Headers({ "Content-Type" : "application/json" });
    let options = new RequestOptions({ headers : header });


     this.http.post("http://localhost:3000/api/user/login", obj, options)
    .subscribe(
      result => {
          console.log(result.json());
          sessionStorage.setItem("token", result.json().token); 
          sessionStorage.setItem("userid", result.json().userid);
          sessionStorage.setItem("username",result.json().username);
          sessionStorage.setItem("phoneNumber", result.json().userphoneNumber);
          sessionStorage.setItem("email", result.json().useremail);
          this.router.navigate(['/']); //utk redirect

        },
        error => {
          console.log("User Not Found");
        }
      )

  }


}
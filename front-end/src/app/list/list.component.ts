//tambah AfterViewChecked
import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { Http, RequestOptions, Headers } from "@angular/http";
import { NgForm } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {


constructor( private http : Http, private route : Router, private actRoute: ActivatedRoute ) { }

units = [];
paramsId = <any>{};
user = <any>{}

ngOnInit() {

  // sessionStorage.setItem("nama", "arga")
  // let panggil = sessionStorage.getItem("nama")
  // console.log(panggil)


  this.actRoute.params
  .subscribe(
    params=>{
      this.userList = (params["id"])
      this.paramsId = params["id"]
      console.log(this.paramsId)
    }
  )
  


  this.validateToken()
}

userList(id){

}


validateToken(){

let token = sessionStorage.getItem("token") 
console.log(token)
  let header = new Headers({ "Authorization": "Bearer " + token });
  let options = new RequestOptions({ headers: header });
  this.http.post("http://localhost:3000/api/validatetoken", {}, options)
    .subscribe(
    result => {
      console.log(result.json())
      this.loadProperti();
    },
    error => {
      sessionStorage.removeItem("token");
      this.route.navigate(['/login'])
    }
    )
}

// getUser(){
//   this.user = new USERS()
//   let userid = sessionStorage.getItem("userid");
//   let 
// }

loadProperti(){
  this.http.get("http://localhost:3000/api/properti/")
  .subscribe(
    result => {
        this.units = result.json();
        console.log(result.json())
        console.log(result)
        // console.log(result)
    },
    error => {
      console.log(error);
    }

  );
}


gambar : File;

fileChange($event){
  this.gambar = $event.target.files[0];
  console.log(this.gambar)
}


AddList ( ad : NgForm ) {
    
console.log(ad.value.luasBangunan)

  let formData = new FormData(); 
  formData.append("luasBangunann", ad.value.luasBangunan);
  formData.append("luasTanahh", ad.value.luasTanah);
  formData.append("addresss", ad.value.address);
  formData.append("pricee", ad.value.price);
  formData.append("profilee", this.gambar);

  let header = new Headers();
  let options = new RequestOptions({ headers : header });


  this.http.post("http://localhost:3000/api/properti", formData)
  .subscribe(
    result => {
      console.log(result.json());
      ad.reset();
    },
    error => {
      console.log(error)
    }
  );

}


deleteProperti(id){

  console.log("dsadas")
  
  this.http.delete("http://localhost:3000/api/properti/"+id)
  .subscribe(
    result=>{
      this.loadProperti();
      console.log(result)

    },
    error=>{
      console.log("delete error")
    }
  )
}






}

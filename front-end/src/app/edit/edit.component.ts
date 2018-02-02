import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { Http, RequestOptions, Headers } from "@angular/http";
import { NgForm } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})

export class EditComponent implements OnInit {

  id;

  constructor(private http: Http, private route: Router, private actRoute: ActivatedRoute) { }

  ngOnInit() {
    this.actRoute.params.subscribe(params => {
      this.id= params['id']
    })  }


  EditList(ed: NgForm) {

    console.log(this.id)

    let formData = new FormData();
    formData.append("id", this.id)
    formData.append("luasBangunan", ed.value.luasBangunan);
    formData.append("luasTanah", ed.value.luasTanah);
    formData.append("address", ed.value.address);
    formData.append("price", ed.value.price);

    this.http.put("http://localhost:3000/api/properti/", formData)
      .subscribe(
      result => {
        console.log(result.json());
        this.route.navigate(['/'])
      },
      error => {
        console.log(error)
      }
      );

  }




}



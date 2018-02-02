import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from "@angular/http";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";


import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ListComponent } from './list/list.component';
import { EditComponent } from './edit/edit.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ListComponent,
    EditComponent
  ],
  imports: [
    BrowserModule, HttpModule, FormsModule,
    RouterModule.forRoot([
      { path : 'login', component : LoginComponent},
      { path : '', component : ListComponent},
      { path : 'edit/:id', component : EditComponent}

      
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

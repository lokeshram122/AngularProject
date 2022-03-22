import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms'
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public User:any = {}
  public Button:any = "Login"
  public error:any = "btn btn-success mx-3"

  Login!: FormGroup
    constructor(private formbuilder:FormBuilder,private apiservice:ApiService) { }


    ngOnInit():void {
      this.Login = this.formbuilder.group({
        firstName: [''],
        password:['']
    })

    
  }
  onSubmit(){
    
  }
}

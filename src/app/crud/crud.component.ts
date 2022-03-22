import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms'
import { ApiService } from '../api.service';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css']
})
export class CrudComponent implements OnInit {

  public users:any=[]
  display = "none";
  Login!: FormGroup
  constructor(private formbuilder:FormBuilder,private apiservice:ApiService) { }

  ngOnInit(): void {
    this.Login = this.formbuilder.group({
      _id:[''],
      first_name: [''],
      last_name:[''],
      email_id:[''],
      gender:[''],
      password:['']
  })

  this.getUsers()
  }

  onAdd(){
    (<HTMLInputElement>document.getElementById('add')).hidden=false; 
    (<HTMLInputElement>document.getElementById('edit')).hidden=true; 
    this.openModal()
  }

  openModal() {
    this.display = "block";
  }
  onCloseHandled() {
    this.display = "none";
  }

  showhidepass(){
    if((<HTMLInputElement>document.getElementById('userpass')).type=="text")
    {
      (<HTMLInputElement>document.getElementById('userpass')).type="password"
    }
    else
    {
      (<HTMLInputElement>document.getElementById('userpass')).type="text"
    }
    
  }

  onSubmit(){
    
    debugger;
    console.log(this.Login.value)
    this.apiservice.postUsers({
      first_name:this.Login.value.first_name,
      last_name:this.Login.value.last_name,
      email_id:this.Login.value.email_id,
      gender:this.Login.value.gender,
      password:this.Login.value.password
    }).subscribe((data:any) =>{
      debugger;
      console.log(data)
      this.Login.reset();
      this.display = "none";
      this.getUsers()
    });

  }

  onEditClick(){
    debugger;
    this.apiservice.updateUsers({
      _id:this.Login.value._id,
      first_name:this.Login.value.first_name,
      last_name:this.Login.value.last_name,
      email_id:this.Login.value.email_id,
      gender:this.Login.value.gender,
      password:this.Login.value.password
    }).subscribe((data:any) =>{
      debugger;
      console.log(data)
      this.Login.reset();
      this.display = "none";
      this.getUsers()
    });
  }

  getUsers(){
    this.apiservice.getUsers()
    .subscribe(data =>{
      console.log(data)
      this.users = data
    });
  }

  onEdit(user:any){
    debugger;
    this.display = "block";
    this.Login.controls['_id'].setValue(user._id)
    this.Login.controls['first_name'].setValue(user.first_name);
    this.Login.controls['last_name'].setValue(user.last_name);
    this.Login.controls['gender'].setValue(user.gender);
    this.Login.controls['email_id'].setValue(user.email_id);
    this.Login.controls['password'].setValue(user.password);
    (<HTMLInputElement>document.getElementById('add')).hidden=true; 
    (<HTMLInputElement>document.getElementById('edit')).hidden=false; 


  }

  onDelete(user:any){
debugger;
    this.apiservice.deleteUsers(user._id)
    .subscribe(data=>{
      debugger;
      this.getUsers()
    },

    error =>{
      debugger;
      console.log('oops', error)
    } 
    );

  }
}

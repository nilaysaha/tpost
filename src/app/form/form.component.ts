import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})


export class FormComponent implements OnInit{
    public availableMethods: Array<string>  = ["GET","PUT","POST","DELETE","PATCH"];
    public authenticationMethod: Array<string> = ["None","Token","Password"];
    public submitted:boolean = false;
    
    constructor(private _fb: FormBuilder) {}

    passwordMatchValidator(){
	
    }
    
    ngOnInit() {
	public cform = this._fb.group({
	    url:["",[Validators.required,Validators.pattern("https?://.+")]],
	    method:["GET",Validators.required],
	    payload:[""],
	    authentication:this._fb.group({
		method:["None"],
		username:[""],
		password:[""],
		token:[""]
	    },this.passwordMatchValidator),
	    response:[""]
	});
	
	doRequest(){
	    this.submitted = true;
	}	
    }

}

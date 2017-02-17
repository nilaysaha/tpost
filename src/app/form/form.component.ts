import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})


export class FormComponent implements OnInit{

    availableMethods: Array<string>  = ["GET","PUT","POST","DELETE","PATCH","HEAD"];
    authenticationMethod: Array<string> = ["None","Token","Password"];
    submitted:boolean = false;
    cform: FormGroup;
    
    constructor(private _fb: FormBuilder) {}

    buildForm():void{
	this.cform = this._fb.group({
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
	})	
    };
    
    doRequest(){
	this.submitted = true;
    }	
    
    passwordMatchValidator(){
	
    }
    
    ngOnInit() {
	this.buildForm();
    }

}

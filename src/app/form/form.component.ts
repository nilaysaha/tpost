import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { FlashMessagesService } from 'angular2-flash-messages';

import {CrequestService} from '../services/crequest/crequest.service';

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.css'],
    providers:[CrequestService]
})


export class FormComponent {

    title: string = 'Simple Curl Request App';
    
    availableMethods: Array<string>  = ["GET","PUT","POST","DELETE","PATCH","HEAD"];
    authenticationMethod: Array<string> = ["None","Token","Password"];
    contentTypes:Array<string> = ["text/plain","application/octet-stream","application/json",];
    submitted:boolean = false;
    cform: FormGroup;
    uniqueUrls:string[]
    dataFetchingTried:boolean = false;
    
    constructor(private _fb: FormBuilder,private service:CrequestService,private _flashMessagesService: FlashMessagesService) {}

    passwordMatchValidator(){
	;
    }
    
    buildForm():void{
	console.log("inside buildform")
	
	this.cform = this._fb.group({
	    url:["",[Validators.required,Validators.pattern("https?://.+")]],
	    method:["GET",Validators.required],
	    payload:"",
	    contentType:"",
	    authentication:this._fb.group({
		method:["None"],
		username:[""],
		password:[""],
		token:[""]
	    },this.passwordMatchValidator),
	    response:[""]
	})	
    };
    
    doRequest(event:Event){
	event.preventDefault();
	this.submitted = true;
	console.log('submitting form value for request:',JSON.stringify(this.cform.value,null,4));

	this.service.initRequest(this.cform.value)
	    .subscribe(
		response => {
		    console.log("response has been subscribed. Value is:",JSON.stringify(response,null,4));
		    this.cform.value['response'] = JSON.stringify(response,null,4);
		},
		err => {
		    this.cform.value['response'] = JSON.stringify(err,null,4);
		    
		});

	this.service.saveReqParams(this.cform.value)
    };

    displayFlash(msg){
	
    }
    
    initForm(){
	let me = this;
	this.service.fetchUniqueUrls()
	    .subscribe(
		response => {

		    me.uniqueUrls = response.urlList
		},
		err => {
		    console.error("error in fetching urls:",err);
		    console.log(this._flashMessagesService);
		    me.buildForm()
		    me.dataFetchingTried = true;
		    this._flashMessagesService.show('MongoDb Cache server is offline. No request will be stored', { cssClass: 'alert-danger', timeout: 2000 });
		},
		() => {
		    me.buildForm()
		    me.dataFetchingTried = true;
		    this._flashMessagesService.show('Connected to MongoDb Cache server. ', { cssClass: 'alert-info', timeout: 2000 });
		}
		
	    )
    }
    
    ngOnInit() {
	this.initForm()
    }

}

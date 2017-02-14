import { Injectable } from '@angular/core';
import {BaseRequestOptions, Request, RequestMethod,Http,Response,Headers} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

// Following structure will be sent to this module
// {
//     url:["",[Validators.required,Validators.pattern("https?://.+")]],
//     method:["GET",Validators.required],
//     payload:[""],
//     authentication:this._fb.group({
// 	method:["None"],
// 	username:[""],
// 	password:[""],
// 	token:[""]
//     })
// }

@Injectable()
export class CrequestService {
    
    private capitalizeFirstLetter(s:string):string {
	return string.charAt(0).toUpperCase() + string.slice(1);
    }
    
    private extractData(res: Response){
	let body = res.json();
	return body.data || { };	
    }

    private handleError(error:Response| any){
	
    }
    
    constructor(reqParams) {
	this.http = Http;
	this.response = {};
	
	let headers = new Headers({"Content-Type":"application/x-www-form-urlencoded"});
	let auth = reqParams.authentication;
	let url = reqParams.url;
	let withCredentials = false;
	
	switch(auth.method){
	case 'Token':
	    url = [url,'?token=',auth.token].join('');
	    return;
	case 'Password':
	    headers.append("Authorization", "Basic " + btoa(auth.username + ":" + auth.password));
	    withCredentials = true;
	    return;
	case 'None':
	default:
	    console.log('no authentication needed');
	    return;
	}
	
	let options: RequestOptions = new RequestOptions({
	    method: new RequestMethod(this.capitalizeFirstLetter(reqParams.method)),
	    url: url,
	    headers:headers,
	    responseType:"",
	    body:JSON.stringify(reqParams.payload),
	    withCredentials:withCredentials
	});
	
	this.req = new Request(options);
    }
    
    execRequest():Observable<any> {

	//here deal with the complexity of the request.
	//step 1: what is the method
	//step 2: what is the payload if there is one.
	//step 3: is authentication needed and if so what type.
	//step 4: make request
	//step 5: return the result.
	//step 6: unit test to mock this.
	//step 7: use it in another module and correct stuff.	

	this.http.request(this.req)
	    .map(res => res.json())
	    .subscribe(response => this.response)
	
    }
    
    

}

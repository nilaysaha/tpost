import { Injectable } from '@angular/core';
import {BaseRequestOptions,ConnectionBackend,RequestOptions, Request, RequestMethod,Response,Headers,Http} from '@angular/http';
import * as Rx from "rxjs/Rx";


@Injectable()
export class CrequestService{

    constructor(){
	this.http = Http;
    }
    
    private capitalizeFirstLetter(s:string):string {
	return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
    }
    
    private extractData(res: Response){
	let body = res.json();
	return body.data || { };	
    }

    private execRequest(request:any):Observable<any> {
	let myhttp = new this.http();
	
	console.log('executing request with options:',request);
	console.log('http module details:',myhttp);
	
	myhttp.request(request)
	    .map(res => res.json())
	    .subscribe(response => {
		console.log('Response to http request:',response);
		me.handleResponse(response);
	    })		
    }
    
    
    private handleResponse(error:Response| any){
	console.log('handling response:',error);
    }

    private constructObservable(options){
	let me = this;

	Rx.Observable
	    .create(observer => {
		observer.next(new Request(options));
		observer.complete();
		return () => console.log('disposed');
	    })
	    .subscribe(
		x => {
		    me.execRequest(x);
		},
		e => {
		    console.log("error in creating request:",e);
		},
		() => {
		    console.log('onCompleted')
		}
	    )
	    .dispose()
    } 

    initRequest(reqParams:any):any {
	console.log("input reqparams:",JSON.stringify(reqParams,null,4));	
	this.response = {};
	
	let headers = new Headers({"Content-Type":"application/x-www-form-urlencoded"});
	let auth = reqParams.authentication;
	let url = reqParams.url;
	let withCredentials = false;
	
	switch(auth.method){
	case 'Token':
	    url = [url,'?token=',auth.token].join('');
	    break;
	case 'Password':
	    headers.append("Authorization", "Basic " + btoa(auth.username + ":" + auth.password));
	    withCredentials = true;
	    break;
	case 'None':
	default:
	    console.log('no authentication needed for url:',url);
	}

	let method:string = RequestMethod[this.capitalizeFirstLetter(reqParams.method)];

	console.log("http method:",RequestMethod[method]);
	
	let options: RequestOptions = new RequestOptions({
	    method: method,
	    url: url,
	    headers:headers,
	    responseType:"",
	    body:JSON.stringify(reqParams.payload),
	    withCredentials:withCredentials
	});

	console.log("Making request with options:",JSON.stringify(options));

	this.constructObservable(options);
    }
        

}

import { Injectable } from '@angular/core';
import {BaseRequestOptions,RequestOptions,RequestOptionsArgs, Request, RequestMethod,Response,Headers,Http,ResponseContentType} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
//import * as Rx from "rxjs/Rx";


@Injectable()
export class CrequestService{

    constructor(private http:Http){}
    
    private capitalizeFirstLetter(s:string):string {
	return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
    }
    
    private handleError(error: Response| any ){
	// In a real world app, we might use a remote logging infrastructure
	let errMsg: string;

	console.error('error in http request:',error);
	
	if (error instanceof Response) {
	    const body = error.json() || '';
	    const err = body.error || JSON.stringify(body);
	    errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
	}
	else
	{
	    errMsg = error.message ? error.message : error.toString();
	}
	console.error(errMsg);
	return Observable.throw(errMsg);
    }

    private extractData(res: Response){
	console.log("returned after request.");
	let body = res.json();
	console.log("response from remote url:" ,JSON.stringify(body,null,4));
	return body || { };	
    }

    private handleResponse(error:Response| any){
	console.log('handling response:',error);
    }
    
    private execRequest(request:any): Observable<any> {
	console.log('executing request with options:',request);
	console.log('http module details:',this.http);
	
	return this.http.request(request)
	    .map(this.extractData)
            .catch(this.handleError);    
    }
    
    initRequest(reqParams:any):any {
	console.log("input reqparams:",JSON.stringify(reqParams,null,4));
	let contentType = reqParams.contentType || 'application/json';
	let headers = new Headers({"Content-Type":contentType});
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
	
	let options: any = {
	    method: method,
	    url: url,
	    headers:headers,
	    body:(reqParams.payload != "")?JSON.parse(reqParams.payload):""
	};
	
	console.log("Making request with options:",JSON.stringify(options));
	return this.execRequest(new Request(options))
    }


    saveReqParams(reqParams:any):void {
	
	let saveParams:any = {
	    method:'POST',
	    url:'http://localhost:3000/saveRequestParams?url='+reqParams.url+'&method='+reqParams.method,
	    headers:new Headers({}),
	    body:JSON.stringify(reqParams.body)
	};
	
	this.execRequest(new Request(saveParams))
	    .subscribe(
		response => {
		    console.log("tried to store the request to db. Response was:",response)
		},
		err => {
		    console.log('error in saving request to mongodb. Error is:',err)
		}
	    )
    }
    

    fetchUniqueUrls():Observable<any> {
	let params:any = {
	    method:'GET',
	    url:'http://localhost:3000/getUniqueUrls',
	    headers:new Headers({})
	}

	return this.execRequest(new Request(params))	
    }
    
}

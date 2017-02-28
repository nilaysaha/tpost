import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
 

@Injectable()
export class AuthenticateService {

    public token:string;   
    private loggedIn = false;
    
    constructor(private http:Http) {
	// set token if saved in local storage
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
    }

    isLoggedIn(){
	return true;
    }
    
}

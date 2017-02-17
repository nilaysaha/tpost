import { Injectable } from '@angular/core';
import {BaseRequestOptions,ConnectionBackend,RequestOptions, Request, RequestMethod,Response,Headers,Http} from '@angular/http';
import {Observable} from "rxjs/Rx";



@Injectable()
export class MyService {
  constructor() {
      this.http = Http;
  }

  handleError(err) {
    console.log('err = '+err);
  }
  
  checkLoginData(data) {
    return true;
  }

  postLogin() {
    console.log('postLogin');
    return this.http.get('https://contactsapi.apispark.net/v1/companies/11').map(res => res.json())
    .catch(err => {
      this.handleError(err);
      return Observable.throw(err.json());
    });
    //return obs;
  }
}

/* tslint:disable:no-unused-variable */

import { HttpModule } from '@angular/http';
import { TestBed, async, inject, beforeEachProviders } from '@angular/core/testing';
import { CrequestService } from './crequest.service';


describe('Service: CrequestService', () => {

    let service: CrequestService;

    console.log("inside testcase crequestservice");

    beforeEach(() => {
	TestBed.configureTestingModule({
	    imports:[HttpModule],
	    providers: [CrequestService]
	});
    });
    
    beforeEach(() => {
	this.service = new CrequestService();
    });

    
    it('should ...', inject([CrequestService], (service: CrequestService) => {

	console.log("Executing testcase: should ....");	
	expect(service).toBeTruthy();	
    }));


    it('get request ...',inject([CrequestService],(service:CrequestService) => {
	
	let sample_request_model =  {
	    "url": "http://httpbin.org/ip",
	    "method": "GET",
	    "payload": "",
	    "authentication": {
		"method": "None",
		"username": "",
		"password": "",
		"token": ""
	    },
	    "response": ""
	};	   

	
	service.initRequest(sample_request_model);
	expect(service).toBeTruthy();
	
    }))
});

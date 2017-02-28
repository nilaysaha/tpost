import { Component,VERSION,Input } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
    
    constructor(){
	console.log('angular version:',VERSION.full);
    }

    handleUserUpdated(){
	console.log("inside handle user update. Event has been triggered")
    }
    
}

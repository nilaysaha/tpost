import { Component,VERSION } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
    title = 'Simple Curl Request App';
    constructor(){
	console.log('angular version:',VERSION.full);
    }
}

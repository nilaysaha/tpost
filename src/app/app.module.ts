import { BrowserModule } from '@angular/platform-browser';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { AlertModule } from 'ng2-bootstrap';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';

import {CrequestService} from './services/crequest/crequest.service';

@NgModule({
    declarations: [
	AppComponent,
	FormComponent
    ],
    imports: [
	BrowserModule,
	HttpModule,
	JsonpModule,
	FormsModule,
	ReactiveFormsModule,
	AlertModule.forRoot(),
	NgbModule.forRoot()
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    providers: [CrequestService],
    bootstrap: [AppComponent]
})
export class AppModule { }

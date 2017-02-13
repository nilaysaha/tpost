import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AlertModule } from 'ng2-bootstrap';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';

@NgModule({
    declarations: [
	AppComponent,
	FormComponent
    ],
    imports: [
	BrowserModule,
	HttpModule,
	FormsModule,
	ReactiveFormsModule,
	AlertModule.forRoot(),
	NgbModule.forRoot()
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { AlertModule } from 'ng2-bootstrap';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { FlashMessagesModule } from 'angular2-flash-messages';

import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';

import {CrequestService} from './services/crequest/crequest.service';
import { AuthenticateComponent } from './authenticate/authenticate.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { MainPageComponent } from './main-page/main-page.component';

const appRoutes: Routes = [
    { path:'', component: MainPageComponent},
    { path: 'request',component: FormComponent },
    { path:'login',component: AuthenticateComponent},
    { path: '**', component: PagenotfoundComponent }
];


@NgModule({
    declarations: [
	AppComponent,
	FormComponent,
	AuthenticateComponent,
	PagenotfoundComponent,
	MainPageComponent
    ],
    imports: [
	RouterModule.forRoot(appRoutes),
	BrowserModule,
	HttpModule,
	JsonpModule,
	FormsModule,
	ReactiveFormsModule,
	FlashMessagesModule,
	AlertModule.forRoot(),
	NgbModule.forRoot()
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    providers: [CrequestService],
    bootstrap: [AppComponent]
})
export class AppModule { }

/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';
import { FormsModule,ReactiveFormsModule,FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';

describe('AppComponent', () => {
    beforeEach(() => {
	TestBed.configureTestingModule({
	    imports:[
		FormsModule,
		ReactiveFormsModule		
	    ],
	    declarations: [
		AppComponent,FormComponent
	    ],
	});
	TestBed.compileComponents();
    });
    
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'Simple Curl Request App'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Simple Curl Request App');
  }));

  it('should render title in a h1 tag', async(() => {
      const fixture = TestBed.createComponent(AppComponent);
      fixture.detectChanges();
      const compiled = fixture.debugElement.nativeElement;
      let content = compiled.querySelector('h1').textContent;
      console.log(content);
      expect(content).toContain('Simple Curl Request App');
  }));
    
});

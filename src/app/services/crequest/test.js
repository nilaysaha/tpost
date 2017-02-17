'use strict';

let rx = require('rxjs/Rx');

let subscription = rx.Observable
    .create(observer => {      
      observer.onNext(42);
      observer.onCompleted();
      
      return () => console.log('disposed');
      
    })
    .subscribe(
      x => {
	console.log('onNext:',x);
      },
      e => {
	console.log('error:',e);
      },
      () => {
	console.log('disposed');
      }
    )




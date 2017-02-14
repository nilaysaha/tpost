/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CrequestService } from './crequest.service';

describe('CrequestService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CrequestService]
    });
  });

  it('should ...', inject([CrequestService], (service: CrequestService) => {
    expect(service).toBeTruthy();
  }));
});

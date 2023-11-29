import { TestBed } from '@angular/core/testing';

import { LocationsService } from './locations.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('LocationsService', () => {
  let service: LocationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpClient, HttpHandler]
    });
    service = TestBed.inject(LocationsService);
  });

   it('should be created', () => {
     expect(service).toBeTruthy();
   });
});

import { TestBed } from '@angular/core/testing';

import { IonicIconsService } from './ionic-icons.service';

describe('IonicIconsService', () => {
  let service: IonicIconsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IonicIconsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

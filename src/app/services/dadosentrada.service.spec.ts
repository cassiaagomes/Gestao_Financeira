import { TestBed } from '@angular/core/testing';

import { DadosEntradaService } from './dadosentrada.service';

describe('DadosentradaService', () => {
  let service: DadosEntradaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DadosEntradaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

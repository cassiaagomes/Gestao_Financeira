import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntradasaidaListComponent } from './entradasaida-list.component';

describe('EntradasaidaListComponent', () => {
  let component: EntradasaidaListComponent;
  let fixture: ComponentFixture<EntradasaidaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EntradasaidaListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EntradasaidaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

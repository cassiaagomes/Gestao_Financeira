import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarMovimentacoesComponent } from './editar-movimentacoes.component';

describe('EditarMovimentacoesComponent', () => {
  let component: EditarMovimentacoesComponent;
  let fixture: ComponentFixture<EditarMovimentacoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditarMovimentacoesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditarMovimentacoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

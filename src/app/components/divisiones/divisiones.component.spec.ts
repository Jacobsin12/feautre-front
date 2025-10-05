import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DivisionesComponent } from './divisiones.component';

describe('DivisionesComponent', () => {
  let component: DivisionesComponent;
  let fixture: ComponentFixture<DivisionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DivisionesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DivisionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

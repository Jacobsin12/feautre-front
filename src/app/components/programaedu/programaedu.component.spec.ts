import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramaeduComponent } from './programaedu.component';

describe('ProgramaeduComponent', () => {
  let component: ProgramaeduComponent;
  let fixture: ComponentFixture<ProgramaeduComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgramaeduComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgramaeduComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

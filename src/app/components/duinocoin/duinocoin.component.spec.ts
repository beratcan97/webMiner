import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DuinocoinComponent } from './duinocoin.component';

describe('DuinocoinComponent', () => {
  let component: DuinocoinComponent;
  let fixture: ComponentFixture<DuinocoinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DuinocoinComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DuinocoinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

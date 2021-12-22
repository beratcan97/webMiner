import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoneroComponent } from './monero.component';

describe('MoneroComponent', () => {
  let component: MoneroComponent;
  let fixture: ComponentFixture<MoneroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoneroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MoneroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
